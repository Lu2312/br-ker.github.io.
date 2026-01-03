# Guía para Integrar Datos de Google Maps

## Opción 1: Google Places API (Recomendado - Oficial)

### Paso 1: Obtener API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita "Places API" y "Maps JavaScript API"
4. Ve a "Credenciales" y crea una API Key
5. Restringe la API Key a tu dominio

### Paso 2: Instalar en tu proyecto

```html
<!-- Agregar antes del </head> en index.html -->
<script src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=places"></script>
```

### Paso 3: Código para buscar restaurantes

```javascript
// google-places-integration.js

async function buscarRestaurantesGooglePlaces(ciudad, query = 'restaurante') {
    const service = new google.maps.places.PlacesService(
        document.createElement('div')
    );
    
    // Geocodificar ciudad primero
    const geocoder = new google.maps.Geocoder();
    const locationResult = await geocoder.geocode({ address: ciudad + ', México' });
    const location = locationResult.results[0].geometry.location;
    
    const request = {
        location: location,
        radius: 10000, // 10km
        type: 'restaurant',
        keyword: query
    };
    
    return new Promise((resolve, reject) => {
        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(results);
            } else {
                reject(status);
            }
        });
    });
}

// Obtener detalles completos de un restaurante
async function obtenerDetallesRestaurante(placeId) {
    const service = new google.maps.places.PlacesService(
        document.createElement('div')
    );
    
    const request = {
        placeId: placeId,
        fields: [
            'name',
            'formatted_address',
            'formatted_phone_number',
            'international_phone_number',
            'website',
            'opening_hours',
            'rating',
            'user_ratings_total',
            'price_level',
            'photos',
            'geometry',
            'url'
        ]
    };
    
    return new Promise((resolve, reject) => {
        service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(convertirAFormatoPropio(place));
            } else {
                reject(status);
            }
        });
    });
}

// Convertir formato de Google Places a nuestro formato
function convertirAFormatoPropio(googlePlace) {
    return {
        nombre: googlePlace.name,
        categoria: 'restaurantes',
        subcategoria: 'Restaurante',
        telefono: googlePlace.formatted_phone_number || googlePlace.international_phone_number || 'No disponible',
        email: '', // Google Places no proporciona email
        direccion: googlePlace.formatted_address,
        ciudad: extraerCiudad(googlePlace.formatted_address),
        estado: extraerEstado(googlePlace.formatted_address),
        paginaWeb: googlePlace.website || '',
        googleMaps: googlePlace.url,
        coordenadas: {
            lat: googlePlace.geometry.location.lat(),
            lng: googlePlace.geometry.location.lng()
        },
        horario: convertirHorarios(googlePlace.opening_hours),
        rating: googlePlace.rating || 0,
        totalReviews: googlePlace.user_ratings_total || 0,
        precioPromedio: calcularPrecioPromedio(googlePlace.price_level),
        fotoPerfil: googlePlace.photos && googlePlace.photos[0] 
            ? googlePlace.photos[0].getUrl({ maxWidth: 400 })
            : 'https://via.placeholder.com/400x300',
        fotos: googlePlace.photos 
            ? googlePlace.photos.slice(0, 5).map(photo => photo.getUrl({ maxWidth: 800 }))
            : [],
        verificado: true,
        premium: false
    };
}

function convertirHorarios(openingHours) {
    if (!openingHours || !openingHours.weekday_text) {
        return {};
    }
    
    const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const horario = {};
    
    openingHours.weekday_text.forEach((texto, index) => {
        const [, horas] = texto.split(': ');
        horario[dias[index]] = horas;
    });
    
    return horario;
}

function calcularPrecioPromedio(priceLevel) {
    const precios = {
        1: 150,  // $
        2: 350,  // $$
        3: 650,  // $$$
        4: 1200  // $$$$
    };
    return precios[priceLevel] || 400;
}

function extraerCiudad(direccion) {
    // Lógica simple - mejorar según necesidades
    const partes = direccion.split(',');
    return partes[partes.length - 2]?.trim() || 'Ciudad de México';
}

function extraerEstado(direccion) {
    const estados = {
        'CDMX': 'CDMX',
        'Ciudad de México': 'CDMX',
        'Jalisco': 'Jalisco',
        'Nuevo León': 'Nuevo León',
        // Agregar más estados
    };
    
    for (const [clave, valor] of Object.entries(estados)) {
        if (direccion.includes(clave)) {
            return valor;
        }
    }
    return 'CDMX';
}

// EJEMPLO DE USO:
async function cargarRestaurantesDeGoogle() {
    try {
        // Buscar restaurantes en CDMX
        const resultados = await buscarRestaurantesGooglePlaces('Ciudad de México');
        
        // Obtener detalles completos de cada uno
        const proveedores = [];
        for (const result of resultados) {
            const detalles = await obtenerDetallesRestaurante(result.place_id);
            proveedores.push(detalles);
        }
        
        // Agregar a la base de datos
        providersDatabase.restaurantes.push(...proveedores);
        
        // Recargar proveedores en la página
        loadProvidersFromDatabase();
        
        console.log(`✅ Cargados ${proveedores.length} restaurantes desde Google Places`);
    } catch (error) {
        console.error('Error al cargar desde Google Places:', error);
    }
}
```

### Paso 4: Límites y Costos

- **Gratis**: $200 USD/mes en créditos
- **Después**: ~$17 por cada 1,000 búsquedas
- **Detalles**: ~$17 por cada 1,000 peticiones de detalles

### Paso 5: Implementar en tu página

```javascript
// En script.js, agregar al final:

// Botón para cargar datos de Google
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    
    // Agregar botón para cargar desde Google Places
    const loadGoogleButton = document.createElement('button');
    loadGoogleButton.textContent = '🔄 Cargar Restaurantes de Google Maps';
    loadGoogleButton.className = 'btn-primary centered';
    loadGoogleButton.style.margin = '20px auto';
    loadGoogleButton.onclick = cargarRestaurantesDeGoogle;
    
    document.querySelector('.awards-section .container').appendChild(loadGoogleButton);
});
```

---

## Opción 2: Herramientas de Web Scraping

### 1. Outscraper (Servicio Pago - Más fácil)

```javascript
// API de Outscraper
const OUTSCRAPER_API_KEY = 'tu_api_key';

async function obtenerRestaurantesOutscraper(query, ubicacion) {
    const url = `https://api.app.outscraper.com/maps/search-v2`;
    
    const params = new URLSearchParams({
        query: query + ' ' + ubicacion,
        limit: 100,
        language: 'es',
        region: 'MX'
    });
    
    const response = await fetch(`${url}?${params}`, {
        headers: {
            'X-API-KEY': OUTSCRAPER_API_KEY
        }
    });
    
    const data = await response.json();
    return data.data;
}
```

Precios Outscraper:
- $29/mes por 5,000 búsquedas
- $99/mes por 20,000 búsquedas

### 2. Apify (Plataforma de Scraping)

```javascript
// Usar Apify Google Maps Scraper
const APIFY_TOKEN = 'tu_token';

async function scrapearConApify(ciudad) {
    const input = {
        searchStringsArray: [`restaurantes en ${ciudad}, México`],
        maxCrawledPlacesPerSearch: 100,
        language: 'es',
        countryCode: 'mx'
    };
    
    const response = await fetch(
        `https://api.apify.com/v2/acts/nwua9Gu5YrADL7ZDj/runs?token=${APIFY_TOKEN}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        }
    );
    
    const run = await response.json();
    // Esperar a que termine y obtener resultados
    // Ver documentación de Apify para detalles
}
```

---

## Opción 3: Exportar Datos Manualmente

### Método Simple con Google Maps:

1. Abre Google Maps
2. Busca "restaurantes en Ciudad de México"
3. Instala extensión de Chrome "Data Scraper" o "Web Scraper"
4. Configura para extraer:
   - Nombre
   - Dirección  
   - Teléfono
   - Sitio web
   - Calificación
5. Exporta a CSV
6. Convierte CSV a JSON con un convertidor online
7. Importa a `providers-database.js`

---

## Opción 4: Script de Python (Para extracciones grandes)

```python
# scraper_google_maps.py
from googlemaps import Client
import json

API_KEY = 'tu_api_key'
gmaps = Client(key=API_KEY)

def buscar_restaurantes(ciudad):
    places = gmaps.places_nearby(
        location=ciudad,
        radius=10000,
        type='restaurant'
    )
    
    restaurantes = []
    for place in places['results']:
        detalles = gmaps.place(place['place_id'])
        restaurante = {
            'nombre': detalles['result']['name'],
            'telefono': detalles['result'].get('formatted_phone_number', ''),
            'direccion': detalles['result']['formatted_address'],
            'website': detalles['result'].get('website', ''),
            'rating': detalles['result'].get('rating', 0),
            'total_reviews': detalles['result'].get('user_ratings_total', 0)
        }
        restaurantes.append(restaurante)
    
    return restaurantes

# Buscar restaurantes
cdmx_coords = (19.4326, -99.1332)
restaurantes = buscar_restaurantes(cdmx_coords)

# Guardar en JSON
with open('restaurantes.json', 'w', encoding='utf-8') as f:
    json.dump(restaurantes, f, ensure_ascii=False, indent=2)

print(f"✅ Extraídos {len(restaurantes)} restaurantes")
```

---

## Recomendaciones Finales

1. **Para Prototipo/Demo**: Usa datos de ejemplo (ya incluidos)
2. **Para Producción Pequeña**: Google Places API (gratis hasta 200 USD/mes)
3. **Para Base de Datos Grande**: Outscraper o Apify (una vez, luego actualizar manualmente)
4. **Para Proyecto Personal**: Script de Python + Google Places API

## Nota Legal ⚠️

- Respeta los términos de servicio de Google Maps
- No vendas datos extraídos de Google
- Usa los datos solo para tu plataforma
- Atribuye correctamente la fuente de los datos
- Considera pedir a los restaurantes que se registren directamente en tu plataforma

## Próximos Pasos

1. Empieza con los datos de ejemplo incluidos
2. Configura Google Places API cuando tengas usuarios reales
3. Implementa un formulario para que proveedores se registren directamente
4. Actualiza la base de datos periódicamente
