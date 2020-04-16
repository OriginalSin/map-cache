const yandex =
	'&copy; <a href="https://n.maps.yandex.ru/?oid=1900133#!/?z=18&ll=36.860478%2C55.429679&l=nk%23map">Yandex</a> contributors'
const conf = {
	layers: {
		m1: {
			title: 'Дороги',
			urlTemplate: '../tiles/m1/{z}/{x}/{y}.png',
			errorTileUrl:
				'https://04.core-nmaps-renderer-nmaps.maps.yandex.net?x={x}&y={y}&z={z}&l=mpskl&sl=104,301135,301750,302526,5300026,5400046,70300482,70300490,70300627',
			type: 'Leaflet.tileLayer.Mercator',
			options: {
				minZoom: 8,
				maxZoom: 19,
				attribution: yandex,
			},
			prefix: 'https://sat04.maps.yandex.net/tiles',
		},
		m2: {
			title: 'Карта(Яндекс)',
			urlTemplate: '../tiles/m2/{z}/{x}/{y}.png',
			errorTileUrl:
				'https://vec01.maps.yandex.net/tiles?l=map&v=18.01.10-2&x={x}&y={y}&z={z}&scale=1&lang=ru_RU',
			type: 'Leaflet.tileLayer.Mercator',
			options: {
				maxZoom: 19,
				attribution: yandex,
			},
			prefix: 'https://sat04.maps.yandex.net/tiles',
		},
		m3: {
			title: 'Снимки(Яндекс)',
			urlTemplate: '../tiles/m3/{z}/{x}/{y}.png',
			errorTileUrl:
				'https://sat04.maps.yandex.net/tiles?l=sat&v=3.462.0&x={x}&y={y}&z={z}&lang=ru_RU',
			type: 'Leaflet.tileLayer.Mercator',
			options: {
				maxZoom: 19,
				attribution: yandex,
			},
			prefix: 'https://sat04.maps.yandex.net/tiles',
		},
		m4: {
			title: 'Скорости',
			urlTemplate: '../tiles/m4/{z}/{x}/{y}.png',
			errorTileUrl:
				'https://01.core-nmaps-renderer-nmaps.maps.yandex.net?x={x}&y={y}&z={z}&l=mpskl&sl=104,301135,301750,302526,302827,5300026,5400046,70300236,70300638',
			type: 'Leaflet.tileLayer.Mercator',
			options: {
				minZoom: 8,
				maxZoom: 19,
				attribution: yandex,
			},
			prefix: 'https://sat04.maps.yandex.net/tiles',
		},
		v1: {
			title: 'Водоохранные зоны',
			urlTemplate: '../tiles/v1/{z}/{x}/{y}.png',
			errorTileUrl:
				'https://pkk.rosreestr.ru/arcgis/rest/services/PKK6/ZONES/MapServer/export?layers=show%3A1&dpi=96&format=PNG32&bbox={bbox}&bboxSR=102100&imageSR=102100&size=1024%2C1024&transparent=true&f=image',
			type: 'Leaflet.tileLayer.Mercator',
			options: {
				minZoom: 8,
				maxZoom: 19,
				attribution: yandex,
			},
			prefix: 'https://sat04.maps.yandex.net/tiles',
		},
	},
}

export default conf
