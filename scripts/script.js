/*
   \
    '-.__.-'
    /oo |--.--,--,--.
    \_.-'._i__i__i_.'
          """""""""  
José de Jesús Sanchez Hernández 9°
*/

/* esto de aqui viene siendo el codigo de mi carrusel de imagenes o gifs
lo he usado toda la vida asi que es bastante repetitivo pero funcional */
const images = ['urigod.jpg', 'skate.gif', 'skate2.gif', 'skate3.gif']
const slides = document.getElementById("carrusel")
var i = 0

// esta es la funcion para settear el fondo del carrusel
function setBg() {
    slides.style.backgroundImage = "url('/img/carrusel/" + images[i] + "')"
    i = (i + 1) % images.length
}

// se ejecuta una ve cada cierto tiempo pero lo hacemos una vez por separado para añadir la del inicio
setBg()
setInterval(setBg, 7000)

/* esta es toda la infromacion de las patinetas, foto y todo, lo hago de esta forma para hacer dinamicas
todas las cards y si añado mas no tener que camciar el html*/
const skateboards = [
    {
        src: '/img/tablas/mix.webp',
        title: 'Graffiti Design',
        desc: 'Diseñada por Beto, uno de los mejores diseñadores que tenemos.',
        price: 570
    },
    {
        src: '/img/tablas/blue.webp',
        title: 'Blue Design',
        desc: 'Diseñada por Javi, el dueño de los estilos diferentes.',
        price: 650
    },
    {
        src: '/img/tablas/negro.webp',
        title: 'Black Design',
        desc: 'Diseñada por Mayo, el CEO de esta empresa',
        price: 620
    },
    {
        src: '/img/tablas/fea.webp',
        title: 'Crazy Design',
        desc: 'Otro diseño innovador del Beto, uno de los más bizarros.',
        price: 350
    },
    {
        src: '/img/tablas/red.webp',
        title: 'Yellow/Red Design',
        desc: 'De los mejores diseños que ha hecho el Inge, uno de los mejores skaters.',
        price: 700
    },
    {
        src: '/img/tablas/tony.webp',
        title: 'Tony Hawk',
        desc: 'Diseño al puro estilo de Tony Hawk, la calidad sobra en esta tabla.',
        price: 1800
    },
    {
        src: '/img/tablas/uf.webp',
        title: 'Skate Lalo',
        desc: 'Lalo hizo un estilo sencillo sin romperse la cabeza.',
        price: 420
    },
    {
        src: '/img/tablas/wood.webp',
        title: 'Classic Design',
        desc: 'Limpia sin nada de diseño, por si prefieres algo mas tradicional.',
        price: 200
    }
]

// modal para añadir productos, preferi meter un modal por practicidad
const modal = document.getElementById('modal')
const span = document.getElementsByClassName('close')[0]
const modal_add = document.getElementById('modal_add')

// todas estas variables serviran para la insercion de productos y tener un total de la compra asincrono
let current_skate = null
let modalAddClickListener = null
let cart_sum = 0
let cart_count = 0

// este es el boton que usare para cerrar el modal
span.onclick = function () {
    closeModal()
}

// tomamos la pantalla tambien para cerrar el modal y reiniciar algunos valores (tengo 2 modales)
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal()
    } else if (event.target == modal_buy) {
        close_resumen()
    }
}

// esta es la primer funcion de cerrar, me reinicia el valor del array para evitar dobles inserciones
function closeModal() {
    modal.style.display = "none"
    current_skate = null
    document.getElementById('numerin').value = ''
    if (modalAddClickListener) {
        modal_add.removeEventListener('click', modalAddClickListener)
        modalAddClickListener = null
    }
}

// con esto se abre el modal y se ejecutan un monto de funcionalidades
function openModal(skateboard) {
    // abres el modal
    modal.style.display = "block"
    // settear el item que eligieron
    current_skate = skateboard
    // checo si ya añadieron para quitar el evento
    if (modalAddClickListener) {
        modal_add.removeEventListener('click', modalAddClickListener)
    }
    // funcion del evento
    modalAddClickListener = () => {
        // convierto a numero el valor de mi input
        
        
        // agregamos valores a las poderosas variables globales
        let sum = current_skate.price * numerin
        cart_sum += sum
        cart_count += numerin
        // añadimos el item al array
        items.push(current_skate)
        alert('Añadidos correctamente')
    }
    // añadimos el evento al abrir
    modal_add.addEventListener('click', modalAddClickListener)
}

// esto es del segundo modal
const total_btn = document.getElementById('total_btn')
const modal_buy = document.getElementById('modal_buy')
const span_buy = document.getElementById('close_buy')
const suma = document.getElementById('suma')
const count = document.getElementById('items')

// este sera el array de los items agregados
var items = []

// funcion para crear un item de la tabla de resumen usando appendChild y ps se añade cada que se ejecuta
function addCells(item) {
    const tr = document.createElement('tr')
    const td_1 = document.createElement('td')
    const img = document.createElement('img')
    img.src = item.src
    img.alt = item.title
    td_1.appendChild(img)
    tr.appendChild(td_1)
    const td_2 = document.createElement('td')
    const h5 = document.createElement('h5')
    h5.textContent = item.title
    td_2.appendChild(h5)
    tr.appendChild(td_2)
    document.getElementById('resumen_tabla').appendChild(tr)
}

// esto de aqui funciona para activar el resumen y la funcion de crear campos de arriba
total_btn.addEventListener('click', () => {
    modal_buy.style.display = "block"
    suma.innerText = '$' + cart_sum
    if (cart_count === 0) {
        count.innerText = 'No has incluido nada -_-'
    } else {
        count.innerText = 'Incluiste ' + cart_count + ' productos, donde se ecuentran algunos como:'
    }
    items.forEach(item => addCells(item))
})

// me cierra el modal de resumen
span_buy.onclick = function () {
    close_resumen()
}

// botones del resumen
const cancelar = document.getElementById('resumen_can')
const ok = document.getElementById('resumen_ok')

// esto pasa si le pican aceptar
ok.addEventListener('click', () => {
    alert('Puedes seguir comprando :)')
    close_resumen()
})

// esta funcion es llamada cada que se ocupe cerrar el resumen
function close_resumen() {
    modal_buy.style.display = "none"
    items = []
}

// cancelar se lleva mucha de la logica
cancelar.addEventListener('click', () => {
    // con esto podemos confirmar que si se quiera cancelar
    let res = confirm('Estas seguro de cancelar la compra?')
    // si es true
    if (res) {
        // con este if anidado verificamos que al menos existan items añadidos, de ser asi se cancela si no lo regaño
        if (items.length > 0) {
            alert('Cancelado con exito :(')
            cart_sum = 0
            cart_count = 0
            document.getElementById('resumen_tabla').innerHTML = ''
            close_resumen()
        } else {
            alert('Me parece que ni añadiste productos :/')
            close_resumen()
        }
        // si no es true
    } else {
        alert('Puedes seguir comprando :)')
    }
})

// esta funcion es la chida, es la que añade cards de las skateboards
function addCards(skateboard) {
    const card = document.createElement('div')
    card.className = 'cards'

    const img = document.createElement('img')
    img.src = skateboard.src
    img.alt = skateboard.title

    const h3 = document.createElement('h3')
    h3.textContent = skateboard.title

    const p = document.createElement('p')
    p.textContent = skateboard.desc
    p.className = 'texto'

    const h4 = document.createElement('h4')
    h4.textContent = '$' + skateboard.price

    const button = document.createElement('button')
    button.textContent = 'Agregar al carrito'
    button.className = 'boton'
    //este botton tendra el evento para abrir el modal de insercion
    button.addEventListener('click', function () {
        openModal(skateboard)
    })

    // con esto creo el card
    card.appendChild(img)
    card.appendChild(h3)
    card.appendChild(p)
    card.appendChild(h4)
    card.appendChild(button)

    // lo añado cada que se llame
    document.getElementById('contain').appendChild(card)
}

// esto de aqui ejecutara la funcion de añadir por cada item existente
skateboards.forEach(skateboard => addCards(skateboard))