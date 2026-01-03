// Base de Datos de Proveedores - Restaurantes de México
// Estructura compatible con Google Maps API y Google Places

const providersDatabase = {
    restaurantes: [
        {
            id: 1,
            nombre: "La Docena Oyster Bar & Grill",
            categoria: "restaurantes",
            subcategoria: "Mariscos",
            telefono: "+52 55 5264 2424",
            email: "contacto@ladocena.com.mx",
            direccion: "Calle Álvaro Obregón 31, Roma Norte, Cuauhtémoc",
            ciudad: "Ciudad de México",
            estado: "CDMX",
            codigoPostal: "06700",
            paginaWeb: "https://www.ladocena.com.mx",
            googleMaps: "https://goo.gl/maps/ejemplo1",
            coordenadas: {
                lat: 19.4159,
                lng: -99.1624
            },
            horario: {
                lunes: "13:00 - 23:00",
                martes: "13:00 - 23:00",
                miercoles: "13:00 - 23:00",
                jueves: "13:00 - 23:00",
                viernes: "13:00 - 00:00",
                sabado: "13:00 - 00:00",
                domingo: "13:00 - 20:00"
            },
            rating: 4.6,
            totalReviews: 2847,
            precioPromedio: 450,
            capacidad: 120,
            servicios: ["Terraza", "Bar", "Estacionamiento", "WiFi", "Reservaciones"],
            especialidades: ["Ostiones", "Mariscos frescos", "Cocteles"],
            fotoPerfil: "https://via.placeholder.com/400x300?text=La+Docena",
            fotos: [
                "https://via.placeholder.com/800x600?text=Interior",
                "https://via.placeholder.com/800x600?text=Platillo1",
                "https://via.placeholder.com/800x600?text=Platillo2"
            ],
            verificado: true,
            premium: true
        },
        {
            id: 2,
            nombre: "Quintonil",
            categoria: "restaurantes",
            subcategoria: "Alta Cocina Mexicana",
            telefono: "+52 55 5280 2680",
            email: "reservaciones@quintonil.com",
            direccion: "Av. Isaac Newton 55, Polanco, Miguel Hidalgo",
            ciudad: "Ciudad de México",
            estado: "CDMX",
            codigoPostal: "11560",
            paginaWeb: "https://www.quintonil.com",
            googleMaps: "https://goo.gl/maps/ejemplo2",
            coordenadas: {
                lat: 19.4326,
                lng: -99.1956
            },
            horario: {
                lunes: "Cerrado",
                martes: "13:00 - 23:00",
                miercoles: "13:00 - 23:00",
                jueves: "13:00 - 23:00",
                viernes: "13:00 - 00:00",
                sabado: "13:00 - 00:00",
                domingo: "13:00 - 18:00"
            },
            rating: 4.8,
            totalReviews: 1456,
            precioPromedio: 1200,
            capacidad: 80,
            servicios: ["Sommelier", "Chef's Table", "Eventos Privados", "Reservaciones Obligatorias"],
            especialidades: ["Cocina Contemporánea Mexicana", "Menú Degustación", "Ingredientes Locales"],
            fotoPerfil: "https://via.placeholder.com/400x300?text=Quintonil",
            fotos: [
                "https://via.placeholder.com/800x600?text=Interior",
                "https://via.placeholder.com/800x600?text=Chef",
                "https://via.placeholder.com/800x600?text=Platillo"
            ],
            verificado: true,
            premium: true
        },
        {
            id: 3,
            nombre: "Hacienda de Los Morales",
            categoria: "restaurantes",
            subcategoria: "Cocina Mexicana",
            telefono: "+52 55 5096 3000",
            email: "info@haciendadelosmorales.com",
            direccion: "Av. Ejercito Nacional 525, Irrigación",
            ciudad: "Ciudad de México",
            estado: "CDMX",
            codigoPostal: "11500",
            paginaWeb: "https://www.haciendadelosmorales.com",
            googleMaps: "https://goo.gl/maps/ejemplo3",
            coordenadas: {
                lat: 19.4398,
                lng: -99.1964
            },
            horario: {
                lunes: "08:00 - 23:00",
                martes: "08:00 - 23:00",
                miercoles: "08:00 - 23:00",
                jueves: "08:00 - 23:00",
                viernes: "08:00 - 00:00",
                sabado: "08:00 - 00:00",
                domingo: "08:00 - 22:00"
            },
            rating: 4.5,
            totalReviews: 3521,
            precioPromedio: 650,
            capacidad: 500,
            servicios: ["Jardín", "Eventos", "Salones Privados", "Estacionamiento Valet", "Música en Vivo"],
            especialidades: ["Bodas", "Eventos Corporativos", "Buffet", "Cocina Tradicional"],
            fotoPerfil: "https://via.placeholder.com/400x300?text=Hacienda",
            fotos: [
                "https://via.placeholder.com/800x600?text=Jardin",
                "https://via.placeholder.com/800x600?text=Salon",
                "https://via.placeholder.com/800x600?text=Evento"
            ],
            verificado: true,
            premium: true
        },
        {
            id: 4,
            nombre: "Rosetta",
            categoria: "restaurantes",
            subcategoria: "Italiana Contemporánea",
            telefono: "+52 55 5533 7804",
            email: "contacto@rosetta.com.mx",
            direccion: "Colima 166, Roma Norte, Cuauhtémoc",
            ciudad: "Ciudad de México",
            estado: "CDMX",
            codigoPostal: "06700",
            paginaWeb: "https://www.rosetta.com.mx",
            googleMaps: "https://goo.gl/maps/ejemplo4",
            coordenadas: {
                lat: 19.4178,
                lng: -99.1641
            },
            horario: {
                lunes: "13:00 - 23:00",
                martes: "13:00 - 23:00",
                miercoles: "13:00 - 23:00",
                jueves: "13:00 - 23:00",
                viernes: "13:00 - 00:00",
                sabado: "09:00 - 00:00",
                domingo: "09:00 - 18:00"
            },
            rating: 4.7,
            totalReviews: 2134,
            precioPromedio: 850,
            capacidad: 90,
            servicios: ["Brunch", "Panadería", "Terraza", "Eventos Privados"],
            especialidades: ["Pasta Fresca", "Pan Artesanal", "Brunch Dominical"],
            fotoPerfil: "https://via.placeholder.com/400x300?text=Rosetta",
            fotos: [],
            verificado: true,
            premium: false
        },
        {
            id: 5,
            nombre: "Maximo Bistrot",
            categoria: "restaurantes",
            subcategoria: "Bistrot Francés",
            telefono: "+52 55 5264 4291",
            email: "reservas@maximobistrot.com.mx",
            direccion: "Tonalá 133, Roma Norte, Cuauhtémoc",
            ciudad: "Ciudad de México",
            estado: "CDMX",
            codigoPostal: "06700",
            paginaWeb: "https://www.maximobistrot.com.mx",
            googleMaps: "https://goo.gl/maps/ejemplo5",
            coordenadas: {
                lat: 19.4165,
                lng: -99.1643
            },
            horario: {
                lunes: "13:00 - 23:00",
                martes: "13:00 - 23:00",
                miercoles: "13:00 - 23:00",
                jueves: "13:00 - 23:00",
                viernes: "13:00 - 00:00",
                sabado: "13:00 - 00:00",
                domingo: "13:00 - 18:00"
            },
            rating: 4.6,
            totalReviews: 1876,
            precioPromedio: 750,
            capacidad: 45,
            servicios: ["Menú del Día", "Cocina de Mercado", "Reservaciones"],
            especialidades: ["Cocina de Temporada", "Ingredientes Orgánicos", "Platos del Día"],
            fotoPerfil: "https://via.placeholder.com/400x300?text=Maximo",
            fotos: [],
            verificado: true,
            premium: false
        },
        {
            id: 6,
            nombre: "Pujol",
            categoria: "restaurantes",
            subcategoria: "Alta Cocina Mexicana",
            telefono: "+52 55 5545 4111",
            email: "contacto@pujol.com.mx",
            direccion: "Tennyson 133, Polanco, Miguel Hidalgo",
            ciudad: "Ciudad de México",
            estado: "CDMX",
            codigoPostal: "11560",
            paginaWeb: "https://www.pujol.com.mx",
            googleMaps: "https://goo.gl/maps/ejemplo6",
            coordenadas: {
                lat: 19.4329,
                lng: -99.1966
            },
            horario: {
                lunes: "Cerrado",
                martes: "13:00 - 22:00",
                miercoles: "13:00 - 22:00",
                jueves: "13:00 - 22:00",
                viernes: "13:00 - 22:00",
                sabado: "13:00 - 22:00",
                domingo: "Cerrado"
            },
            rating: 4.9,
            totalReviews: 2945,
            precioPromedio: 2500,
            capacidad: 60,
            servicios: ["Menú Degustación", "Taco Bar", "Reservaciones Obligatorias", "Eventos Privados"],
            especialidades: ["Mole Madre", "Cocina Mexicana Moderna", "Maridaje de Mezcales"],
            fotoPerfil: "https://via.placeholder.com/400x300?text=Pujol",
            fotos: [],
            verificado: true,
            premium: true
        },
        {
            id: 7,
            nombre: "Contramar",
            categoria: "restaurantes",
            subcategoria: "Mariscos",
            telefono: "+52 55 5514 9217",
            email: "info@contramar.com.mx",
            direccion: "Calle Durango 200, Roma Norte, Cuauhtémoc",
            ciudad: "Ciudad de México",
            estado: "CDMX",
            codigoPostal: "06700",
            paginaWeb: "https://www.contramar.com.mx",
            googleMaps: "https://goo.gl/maps/ejemplo7",
            coordenadas: {
                lat: 19.4156,
                lng: -99.1658
            },
            horario: {
                lunes: "13:00 - 18:00",
                martes: "13:00 - 18:00",
                miercoles: "13:00 - 18:00",
                jueves: "13:00 - 18:00",
                viernes: "13:00 - 19:00",
                sabado: "13:00 - 19:00",
                domingo: "13:00 - 18:00"
            },
            rating: 4.5,
            totalReviews: 4123,
            precioPromedio: 550,
            capacidad: 150,
            servicios: ["No acepta reservaciones", "Terraza", "Bar"],
            especialidades: ["Tostadas de Atún", "Pescado a la Talla", "Cocteles"],
            fotoPerfil: "https://via.placeholder.com/400x300?text=Contramar",
            fotos: [],
            verificado: true,
            premium: false
        },
        {
            id: 8,
            nombre: "Sud 777",
            categoria: "restaurantes",
            subcategoria: "Cocina Contemporánea",
            telefono: "+52 55 5568 4777",
            email: "reservaciones@sud777.com.mx",
            direccion: "Boulevard de la Luz 777, Jardines del Pedregal",
            ciudad: "Ciudad de México",
            estado: "CDMX",
            codigoPostal: "01900",
            paginaWeb: "https://www.sud777.com.mx",
            googleMaps: "https://goo.gl/maps/ejemplo8",
            coordenadas: {
                lat: 19.3125,
                lng: -99.2073
            },
            horario: {
                lunes: "Cerrado",
                martes: "13:00 - 23:00",
                miercoles: "13:00 - 23:00",
                jueves: "13:00 - 23:00",
                viernes: "13:00 - 00:00",
                sabado: "13:00 - 00:00",
                domingo: "13:00 - 18:00"
            },
            rating: 4.7,
            totalReviews: 1654,
            precioPromedio: 900,
            capacidad: 100,
            servicios: ["Jardín", "Eventos Privados", "Bar", "Estacionamiento"],
            especialidades: ["Cocina de Autor", "Ingredientes Mexicanos", "Coctelería"],
            fotoPerfil: "https://via.placeholder.com/400x300?text=Sud777",
            fotos: [],
            verificado: true,
            premium: true
        }
    ],
    
    // Función para buscar proveedores
    buscar: function(termino, ciudad = null, categoria = null) {
        let resultados = this.restaurantes;
        
        if (termino) {
            termino = termino.toLowerCase();
            resultados = resultados.filter(p => 
                p.nombre.toLowerCase().includes(termino) ||
                p.subcategoria.toLowerCase().includes(termino) ||
                p.especialidades.some(e => e.toLowerCase().includes(termino))
            );
        }
        
        if (ciudad) {
            resultados = resultados.filter(p => 
                p.ciudad.toLowerCase().includes(ciudad.toLowerCase()) ||
                p.estado.toLowerCase().includes(ciudad.toLowerCase())
            );
        }
        
        if (categoria && categoria !== 'todos') {
            resultados = resultados.filter(p => p.categoria === categoria);
        }
        
        return resultados;
    },
    
    // Función para obtener por ID
    obtenerPorId: function(id) {
        return this.restaurantes.find(p => p.id === id);
    },
    
    // Función para filtrar por rating
    filtrarPorRating: function(minRating) {
        return this.restaurantes.filter(p => p.rating >= minRating);
    },
    
    // Función para ordenar
    ordenar: function(criterio = 'rating') {
        const copia = [...this.restaurantes];
        
        switch(criterio) {
            case 'rating':
                return copia.sort((a, b) => b.rating - a.rating);
            case 'precio-asc':
                return copia.sort((a, b) => a.precioPromedio - b.precioPromedio);
            case 'precio-desc':
                return copia.sort((a, b) => b.precioPromedio - a.precioPromedio);
            case 'nombre':
                return copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
            default:
                return copia;
        }
    }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = providersDatabase;
}
