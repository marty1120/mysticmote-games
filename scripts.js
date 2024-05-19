$(document).ready(function() {
    // Carga el carrito de compras desde localStorage o inicializa uno nuevo.
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log('Carrito desde localStorage:', carrito);

    // Maneja el evento de añadir productos al carrito.
    $('.buy').click(function() {
        const id = $(this).data('id');
        const name = $(this).data('name');
        const price = parseFloat($(this).data('price'));

        // Asegúrate de que el precio es un número válido
        if (isNaN(price) || price <= 0) {
            alert('Precio no válido para el producto.');
            return;
        }

        const itemInCart = carrito.find(item => item.id === id);

        if (itemInCart) {
            itemInCart.quantity += 1; // Aumenta cantidad si el producto ya existe.
        } else {
            carrito.push({ id, name, price, quantity: 1 }); // Agrega nuevo producto.
        }
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito en localStorage.
        updateCartView(); // Actualiza la vista del carrito.
        alert('Producto añadido correctamente al carrito');
    });

    // Función para actualizar la vista del carrito de compras.
    function updateCartView() {
        $('#carrito').empty();
        let total = 0;
        carrito.forEach(item => {
            if (item.price && item.quantity) {
                total += item.price * item.quantity;
                const html = `<tr>
                                <td>${item.name}</td>
                                <td>${item.price.toFixed(2)}€</td>
                                <td><input type="number" class="form-control quantity" value="${item.quantity}" data-id="${item.id}" data-price="${item.price}"></td>
                                <td class="subtotal">${(item.price * item.quantity).toFixed(2)}€</td>
                                <td><button class="btn btn-danger remove" data-id="${item.id}">Eliminar</button></td>
                              </tr>`;
                $('#carrito').append(html);
            }
        });
        $('#total').text(`${total.toFixed(2)}€`);
        localStorage.setItem('carrito', JSON.stringify(carrito)); 
    }

    // Evento para remover productos del carrito.
    $(document).on('click', '.remove', function() {
        const id = $(this).data('id');
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        updateCartView();
    });

    // Evento para cambiar la cantidad de un producto en el carrito.
    $(document).on('change', '.quantity', function() {
        const id = $(this).data('id');
        const quantity = parseInt($(this).val());
        const itemInCart = carrito.find(item => item.id === id);
        if (itemInCart) {
            itemInCart.quantity = quantity;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            updateCartView();
        }
    });

    // Carrito desplegable
    // Evento para mostrar el carrito desplegable
    $('.carritoDesplegable').on('mouseenter', function() {
        let carritoItems = carrito.slice(0, 3);
        let desplegableHtml = carritoItems.map(item => `<li>${item.name} - ${item.price.toFixed(2)}€</li>`).join('');
        $('.carritoDesplegado').html(desplegableHtml + '<li><a href="carrito.html" class="btn btn-primary">Ir a mi carrito</a></li>');
        $('.carritoDesplegado').show();
    });

    // Evento para ocultar el carrito desplegable
    $('.carritoDesplegable').on('mouseleave', function() {
        $('.carritoDesplegado').hide();
    });

    // Inicializa la vista del carrito cuando se carga la página
    updateCartView();

    // Atajo de teclado para volver al inicio de la página.
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Home') { 
          window.scrollTo(0, 0);
        }
    });

    // Intersection Observer API para animar elementos al ser visibles.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, { rootMargin: '0px', threshold: 0.5 });

    document.querySelectorAll('.game-list article, .merchandising article').forEach(element => {
        observer.observe(element);
    });

    // Controla la visibilidad del menú en dispositivos móviles.
    const toggleButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    toggleButton.addEventListener('click', () => {
        const isDisplayed = nav.style.display === 'block';
        nav.style.display = isDisplayed ? 'none' : 'block';
    });

    // Controla la visibilidad del botón de subir.
    const backToTopButton = document.getElementById('backToTop');
    function scrollHandler() {
        backToTopButton.style.display = (window.scrollY > 100) ? 'block' : 'none'; // Ajusta el valor según el diseño
    }

    window.addEventListener('scroll', scrollHandler);
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Carrusel
    document.addEventListener('DOMContentLoaded', function () {
        var myCarousel = document.querySelector('#gameCarousel');
        var carousel = new bootstrap.Carousel(myCarousel, {
          interval: 2000,
          wrap: true
        });
    });

    // Inicializar el acordeón
    var accordion = new bootstrap.Accordion(document.getElementById('accordionExample'));

    // Inicializar las pestañas
    var tab = new bootstrap.Tab(document.getElementById('myTab'));
});
