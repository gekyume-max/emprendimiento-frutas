/* ==========================================
   PRODUCTOS
========================================== */

const productos = [

    {
        id: 1,
        nombre: "Manzana",
        categoria: "frutas",
        precio: 1500,
        unidad: "kg",
        emoji: "🍎",
        descripcion: "Manzanas frescas y crujientes."
    },

    {
        id: 2,
        nombre: "Plátano",
        categoria: "frutas",
        precio: 1200,
        unidad: "kg",
        emoji: "🍌",
        descripcion: "Plátanos dulces y frescos."
    },

    {
        id: 3,
        nombre: "Naranja",
        categoria: "frutas",
        precio: 1300,
        unidad: "kg",
        emoji: "🍊",
        descripcion: "Naranjas jugosas y llenas de sabor."
    },

    {
        id: 4,
        nombre: "Frutilla",
        categoria: "frutas",
        precio: 2500,
        unidad: "bandeja",
        emoji: "🍓",
        descripcion: "Frutillas frescas de temporada."
    },

    {
        id: 5,
        nombre: "Papa",
        categoria: "verduras",
        precio: 1000,
        unidad: "kg",
        emoji: "🥔",
        descripcion: "Papas seleccionadas."
    },

    {
        id: 6,
        nombre: "Zanahoria",
        categoria: "verduras",
        precio: 900,
        unidad: "kg",
        emoji: "🥕",
        descripcion: "Zanahorias frescas y crujientes."
    },

    {
        id: 7,
        nombre: "Lechuga",
        categoria: "verduras",
        precio: 800,
        unidad: "unidad",
        emoji: "🥬",
        descripcion: "Lechuga fresca del día."
    },

    {
        id: 8,
        nombre: "Tomate",
        categoria: "verduras",
        precio: 1800,
        unidad: "kg",
        emoji: "🍅",
        descripcion: "Tomates frescos y sabrosos."
    },

    {
        id: 9,
        nombre: "Pack Familiar",
        categoria: "packs",
        precio: 8500,
        unidad: "pack",
        emoji: "📦",
        descripcion: "Selección de frutas y verduras."
    },

    {
        id: 10,
        nombre: "Pack Ensalada",
        categoria: "packs",
        precio: 5500,
        unidad: "pack",
        emoji: "🥗",
        descripcion: "Todo para preparar una ensalada."
    },

    {
        id: 11,
        nombre: "Pack Frutal",
        categoria: "packs",
        precio: 6500,
        unidad: "pack",
        emoji: "🍇",
        descripcion: "Variedad de frutas frescas."
    },

    {
        id: 12,
        nombre: "Pack Verduras",
        categoria: "packs",
        precio: 7000,
        unidad: "pack",
        emoji: "🥦",
        descripcion: "Variedad de verduras seleccionadas."
    }

];


/* ==========================================
   VARIABLES
========================================== */

let carrito = [];

const costoDelivery = 2000;


/* ==========================================
   FORMATO DE PRECIO
========================================== */

function formatoPrecio(numero) {

    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
    }).format(numero);

}


/* ==========================================
   MOSTRAR PRODUCTOS
========================================== */

function mostrarProductos(lista = productos) {

    const contenedor =
        document.getElementById("lista-productos");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    lista.forEach(producto => {

        const tarjeta =
            document.createElement("article");

        tarjeta.className = "producto";

        tarjeta.innerHTML = `

            <div class="producto-imagen">
                ${producto.emoji}
            </div>

            <div class="producto-info">

                <span class="categoria">
                    ${producto.categoria}
                </span>

                <h3>
                    ${producto.nombre}
                </h3>

                <p class="producto-descripcion">
                    ${producto.descripcion}
                </p>

                <div class="producto-bottom">

                    <div class="precio">
                        ${formatoPrecio(producto.precio)}
                        <small>/${producto.unidad}</small>
                    </div>

                    <button
                        class="btn-agregar"
                        onclick="agregarCarrito(${producto.id})"
                        title="Agregar al carrito"
                    >
                        +
                    </button>

                </div>

            </div>

        `;

        contenedor.appendChild(tarjeta);

    });

}


/* ==========================================
   FILTRAR PRODUCTOS
========================================== */

function filtrarProductos(categoria, boton) {

    document
        .querySelectorAll(".filtro")
        .forEach(btn => {
            btn.classList.remove("activo");
        });

    if (boton) {
        boton.classList.add("activo");
    }

    if (categoria === "todos") {

        mostrarProductos(productos);

    } else {

        const filtrados =
            productos.filter(
                producto =>
                    producto.categoria === categoria
            );

        mostrarProductos(filtrados);

    }

}


/* ==========================================
   AGREGAR AL CARRITO
========================================== */

function agregarCarrito(id) {

    const producto =
        productos.find(
            producto => producto.id === id
        );

    if (!producto) {
        return;
    }

    const productoExistente =
        carrito.find(
            item => item.id === id
        );

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    actualizarCarrito();

    abrirCarrito();

}


/* ==========================================
   CAMBIAR CANTIDAD
========================================== */

function cambiarCantidad(id, cambio) {

    const item =
        carrito.find(
            producto => producto.id === id
        );

    if (!item) {
        return;
    }

    item.cantidad += cambio;

    if (item.cantidad <= 0) {

        carrito =
            carrito.filter(
                producto => producto.id !== id
            );

    }

    actualizarCarrito();

}


/* ==========================================
   ELIMINAR PRODUCTO
========================================== */

function eliminarProducto(id) {

    carrito =
        carrito.filter(
            producto => producto.id !== id
        );

    actualizarCarrito();

}


/* ==========================================
   ACTUALIZAR CARRITO
========================================== */

function actualizarCarrito() {

    const contenedor =
        document.getElementById(
            "productos-carrito"
        );

    const contador =
        document.getElementById(
            "contador-carrito"
        );

    const subtotalElemento =
        document.getElementById(
            "subtotal"
        );

    const deliveryElemento =
        document.getElementById(
            "costo-delivery"
        );

    const totalElemento =
        document.getElementById(
            "total"
        );

    if (
        !contenedor ||
        !contador ||
        !subtotalElemento ||
        !deliveryElemento ||
        !totalElemento
    ) {
        return;
    }

    const cantidadTotal =
        carrito.reduce(
            (total, item) =>
                total + item.cantidad,
            0
        );

    contador.textContent =
        cantidadTotal;


    /* ==========================================
       CARRITO VACÍO
    ========================================== */

    if (carrito.length === 0) {

        contenedor.innerHTML = `

            <div class="carrito-vacio">

                <span>🛒</span>

                <p>
                    Tu carrito está vacío.
                </p>

                <button onclick="cerrarCarrito()">
                    Ver productos
                </button>

            </div>

        `;

        subtotalElemento.textContent =
            formatoPrecio(0);

        deliveryElemento.textContent =
            formatoPrecio(0);

        totalElemento.textContent =
            formatoPrecio(0);

        return;
    }


    /* ==========================================
       MOSTRAR PRODUCTOS DEL CARRITO
    ========================================== */

    let subtotal = 0;

    contenedor.innerHTML = "";


    carrito.forEach(item => {

        const precioTotal =
            item.precio * item.cantidad;

        subtotal += precioTotal;


        const elemento =
            document.createElement("div");

        elemento.className =
            "item-carrito";


        elemento.innerHTML = `

            <div class="item-icono">
                ${item.emoji}
            </div>

            <div class="item-info">

                <h4>
                    ${item.nombre}
                </h4>

                <p>
                    ${formatoPrecio(item.precio)}
                    /${item.unidad}
                </p>

                <div class="cantidad">

                    <button
                        onclick="cambiarCantidad(${item.id}, -1)"
                    >
                        −
                    </button>

                    <strong>
                        ${item.cantidad}
                    </strong>

                    <button
                        onclick="cambiarCantidad(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>

            <strong>
                ${formatoPrecio(precioTotal)}
            </strong>

            <button
                class="btn-eliminar"
                onclick="eliminarProducto(${item.id})"
                title="Eliminar producto"
            >
                🗑️
            </button>

        `;

        contenedor.appendChild(elemento);

    });


    /* ==========================================
       TOTALES
    ========================================== */

    const delivery =
        carrito.length > 0
            ? costoDelivery
            : 0;

    const total =
        subtotal + delivery;


    subtotalElemento.textContent =
        formatoPrecio(subtotal);

    deliveryElemento.textContent =
        formatoPrecio(delivery);

    totalElemento.textContent =
        formatoPrecio(total);

}


/* ==========================================
   ABRIR CARRITO
========================================== */

function abrirCarrito() {

    const carritoElemento =
        document.getElementById("carrito");

    const fondo =
        document.getElementById("fondo-carrito");

    if (carritoElemento) {

        carritoElemento.classList.add("mostrar");

    }

    if (fondo) {

        fondo.classList.add("mostrar");

    }

    document.body.style.overflow =
        "hidden";

}


/* ==========================================
   CERRAR CARRITO
========================================== */

function cerrarCarrito() {

    const carritoElemento =
        document.getElementById("carrito");

    const fondo =
        document.getElementById("fondo-carrito");

    if (carritoElemento) {

        carritoElemento.classList.remove("mostrar");

    }

    if (fondo) {

        fondo.classList.remove("mostrar");

    }

    document.body.style.overflow =
        "";

}


/* ==========================================
   ABRIR FORMULARIO
========================================== */

function abrirFormulario() {

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío. " +
            "Agrega productos antes de " +
            "realizar el pedido."
        );

        return;
    }


    const modal =
        document.getElementById(
            "modal-pedido"
        );

    if (modal) {

        modal.classList.add("mostrar");

    }

}


/* ==========================================
   CERRAR FORMULARIO
========================================== */

function cerrarFormulario() {

    const modal =
        document.getElementById(
            "modal-pedido"
        );

    if (modal) {

        modal.classList.remove("mostrar");

    }

}


/* ==========================================
   CREAR PEDIDO PARA WHATSAPP
========================================== */

const formularioPedido =
    document.getElementById(
        "formulario-pedido"
    );


if (formularioPedido) {

    formularioPedido.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            /* ==========================================
               DATOS DEL CLIENTE
            ========================================== */

            const nombre =
                document
                    .getElementById("nombre")
                    .value
                    .trim();


            const telefono =
                document
                    .getElementById("telefono")
                    .value
                    .trim();


            const direccion =
                document
                    .getElementById("direccion")
                    .value
                    .trim();


            const comuna =
                document
                    .getElementById("comuna")
                    .value;


            const comentario =
                document
                    .getElementById("comentario")
                    .value
                    .trim();


            /* ==========================================
               VALIDAR CARRITO
            ========================================== */

            if (carrito.length === 0) {

                alert(
                    "El carrito está vacío."
                );

                return;

            }


            /* ==========================================
               CALCULAR SUBTOTAL
            ========================================== */

            let subtotal = 0;


            /* ==========================================
               CREAR MENSAJE
            ========================================== */

            let mensaje =
                "*NUEVO PEDIDO - FRESCO HOGAR*\n\n";


            mensaje +=
                "*DATOS DEL CLIENTE*\n";

            mensaje +=
                "Nombre: " +
                nombre +
                "\n";

            mensaje +=
                "Telefono: " +
                telefono +
                "\n";

            mensaje +=
                "Direccion: " +
                direccion +
                "\n";

            mensaje +=
                "Comuna: " +
                comuna +
                "\n\n";


            /* ==========================================
               PRODUCTOS
            ========================================== */

            mensaje +=
                "*DETALLE DEL PEDIDO*\n";


            carrito.forEach(item => {

                const totalProducto =
                    item.precio *
                    item.cantidad;


                subtotal +=
                    totalProducto;


                mensaje +=
                    "- " +
                    item.nombre +
                    " x" +
                    item.cantidad +
                    " = " +
                    formatoPrecio(
                        totalProducto
                    ) +
                    "\n";

            });


            /* ==========================================
               CALCULAR TOTAL
            ========================================== */

            const delivery =
                costoDelivery;


            const total =
                subtotal +
                delivery;


            /* ==========================================
               RESUMEN
            ========================================== */

            mensaje +=
                "\n*RESUMEN DE COMPRA*\n";


            mensaje +=
                "Subtotal: " +
                formatoPrecio(
                    subtotal
                ) +
                "\n";


            mensaje +=
                "Delivery: " +
                formatoPrecio(
                    delivery
                ) +
                "\n";


            mensaje +=
                "*TOTAL: " +
                formatoPrecio(
                    total
                ) +
                "*\n";


            /* ==========================================
               COMENTARIO
            ========================================== */

            if (comentario !== "") {

                mensaje +=
                    "\n*COMENTARIO*\n";

                mensaje +=
                    comentario +
                    "\n";

            }


            /* ==========================================
               DESPEDIDA
            ========================================== */

            mensaje +=
                "\nGracias por comprar " +
                "en Fresco Hogar.";

            mensaje +=
                "\nSu pedido sera preparado " +
                "a la brevedad.";


            /* ==========================================
               WHATSAPP
            ========================================== */

            const numeroWhatsApp =
                "56990380653";


            const url =
                "https://wa.me/" +
                numeroWhatsApp +
                "?text=" +
                encodeURIComponent(
                    mensaje
                );


            /* ==========================================
               ABRIR WHATSAPP
            ========================================== */

            window.open(
                url,
                "_blank"
            );

        }
    );

}


/* ==========================================
   CERRAR MODAL AL HACER CLICK AFUERA
========================================== */

const modalPedido =
    document.getElementById(
        "modal-pedido"
    );


if (modalPedido) {

    modalPedido.addEventListener(
        "click",
        function(event) {

            if (event.target === this) {

                cerrarFormulario();

            }

        }
    );

}


/* ==========================================
   INICIAR PÁGINA
========================================== */

mostrarProductos();

actualizarCarrito();