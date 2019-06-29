import conf from './config'
import download from 'image-downloader'
import fse from 'fs-extra'
import os from 'os'
import prettyBytes from 'pretty-bytes'
import L from 'leaflet'
// import 'leaflet/dist/leaflet.css';

var map = L.map(L.DomUtil.create('div', 'map', document.body), {
	center: [55.758031, 37.611694],
	zoom: 8,
})
// var shell = require('shell');
// var fse = require('fs-extra');
// var os = require('os');
// var prettyBytes = require('pretty-bytes');
console.log(
	'Number of cpu cores: ',
	os.cpus().length,
	'Free memory: ' + prettyBytes(os.freemem()),
	process
)

var Mercator = L.TileLayer.extend({
	options: {
		tilesCRS: L.CRS.EPSG3395,
	},
	_tileOnLoad: function(done, tile) {
		done(null, tile)
		var file = tile.getAttribute('src')
		if (file.indexOf('http') === 0) {
			// console.log('_tileOnLoad', file, tile, tile._file, file.split('/'));
			fse.ensureDirSync(tile._file.replace(/\d+.png$/, ''))
			download.image({ url: file, dest: tile._file }).catch(console.error)
		}
	},
	_tileOnError: function(done, tile, e) {
		var file = tile.getAttribute('src')

		if (file.indexOf('../tiles/') === 0) {
			tile._file = file.substr(1)
			var arr = file.split('/')
			tile.src = L.Util.template(conf.layers[arr[2]].errorTileUrl, {
				z: arr[3],
				x: arr[4],
				y: arr[5].replace('.png', ''),
			})
		}
		done(e, tile)
	},
	_getTiledPixelBounds: function(center) {
		var pixelBounds = L.TileLayer.prototype._getTiledPixelBounds.call(
			this,
			center
		)
		this._shiftY = this._getShiftY(this._tileZoom)
		pixelBounds.min.y += this._shiftY
		pixelBounds.max.y += this._shiftY
		return pixelBounds
	},

	_getTilePos: function(coords) {
		var tilePos = L.TileLayer.prototype._getTilePos.call(this, coords)
		return tilePos.subtract([0, this._shiftY])
	},

	_getShiftY: function(zoom) {
		var map = this._map,
			pos = map.getCenter(),
			shift =
				map.options.crs.project(pos).y - this.options.tilesCRS.project(pos).y

		return Math.floor(L.CRS.scale(zoom) * shift / 40075016.685578496)
	},
})
L.TileLayer.Mercator = Mercator
L.tileLayer.Mercator = function(url, options) {
	return new Mercator(url, options)
}

var baseLayers = {
	OpenStreetMap: L.tileLayer(
		'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		{
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}
	).addTo(map),
}
var m = conf.layers.m3
baseLayers[m.title] = L.tileLayer.Mercator(m.urlTemplate, m.options)
m = conf.layers.m2
baseLayers[m.title] = L.tileLayer.Mercator(m.urlTemplate, m.options)

var overlays = {
	Marker: L.marker([55.758031, 37.611694])
		.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
		.openPopup(),
}
m = conf.layers.m1
overlays[m.title] = L.tileLayer.Mercator(m.urlTemplate, m.options)
m = conf.layers.m4
overlays[m.title] = L.tileLayer.Mercator(m.urlTemplate, m.options)

L.control.layers(baseLayers, overlays).addTo(map)
