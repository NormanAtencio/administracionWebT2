//Varia utilizada para la información general del carrito de compras
var dato = {
    cant :0,//Cantidad de productos agregados a la cesta
    ver: false,//Se inicializa en falso porque no se debe mostrar la cesta sin productos
    precioMax: null,//Se inicializa el valor en nulo para utilizarlo luego como filtro de productos
    cesta: [],//Lista que se utilizará para mostrar la cesta con los productos agregados
    categoria : ""//Utilizado para almacenar la categoría para realizar el filtro
}


var app = new Vue({
    el: '#app',
    data: {
        datos: dato,
        api: [],
        categorias: []
    },
    mounted: function(){
        //llamado a la lista principal de productos
        try{
            fetch('https://api.escuelajs.co/api/v1/products')
            .then((response) => response.json())
            .then((json) => (this.api = json))
            .catch(error => {
                console.log('Ha ocurrido un error consultando por los productos. Error: ', error);
            });
        }catch(error){
            console.log("Ha ocurrido un error con el consumo del api para los productos. Error: " + error);
        }
        
        try{
            //Consumo de la lista de categorías
            fetch('https://api.escuelajs.co/api/v1/categories')
            .then((response) => response.json())
            .then((json) => (this.categorias = json))
            .catch(error => {
                console.log('Ha ocurrido un error consultando por las categorías. Error: ', error);
            });
        }catch(error){
            console.log("Ha ocurrido un error con el consumo del api para las categorías. Error: " + error);
        }
        

        
    },
    methods: {
        agregarProducto(id, nombre, precio) {
            //Se inicializan las variables a utilizar
            let contador = 0;
            let entra = false;//Varibale paa definir si se encontró una coincidencia en el ciclo
            let cantidad = 0;//Variable utilizada para definir el contador de la cantidad de porudctos agregados a la cesta
            let precioP = 0;//Variable utilizada para la sumatoria de los productos con el mismo ID agregados a la cesta
            this.datos.ver = true;//Variable para definir si se debe mostrar la cesta o no (No se debe mostrar si no tiene productos)

            //Se recorre la lista en búsqueda de productos con el mismo ID para agruparlos en la cesta.
            for (let i = 0; i < this.datos.cesta.length; i++) {
                if (this.datos.cesta[i].id == id) {//Si encuentra un producto igual agregado
                    entra = true;
                    cantidad = this.datos.cesta[i].cantidad + 1;
                    precioP = this.datos.cesta[i].precio + precio;

                    //Se utliza la función split para reemplazar el elemento de la lista con la nueva información agrupada
                    this.datos.cesta.splice(i, 1, {
                        cantidad: cantidad, 
                        id: this.datos.cesta[i].id,
                        name: this.datos.cesta[i].name,
                        precio: precioP

                    });
                }
                contador = contador + 1;
            }

            //En caso de haber encontrado una coincidencia del producto se agrega como un nuevo producto a la cesta
            if (entra == false){
                this.datos.cesta.push({
                    cantidad: 1,
                    id: id,
                    name: nombre,
                    precio: precio
                });
                contador = contador + 1;
            }
            this.cant = contador;

            console.log(this.datos.cesta);
        },
        //Procedimiento utilizado para consumir el endpoint par las diferentes categorías
        consultar(categoria){
            if (categoria == null || categoria == ''){
                try{
                    fetch('https://api.escuelajs.co/api/v1/products')
                    .then((response) => response.json())
                    .then((json) => (this.api = json))
                    .catch(error => {
                        console.log('Ha ocurrido un error consultando por los productos. Error: ', error);
                    });
                }catch(error){
                    console.log("Ha ocurrido un error con el consumo del api para los productos desde la función. Error: " + error);
                }
                
            }else{
                fetch('https://api.escuelajs.co/api/v1/products/?categoryId='+categoria)
                .then((response) => response.json())
                .then((json) => (this.api = json))
                .catch(error =>{
                    console.log('Ha ocurrido un error filtrando por categoría. Error: ', error);
                });
            }
        },
        //Función utilizada para eliminar caracteres que aparecen en las imágenes
        cambiarCaracteres(imagen){
            let nuevaCadena;
            nuevaCadena = imagen.replace("[", "");
            nuevaCadena = nuevaCadena.replace("\"","");
            return nuevaCadena;

        }

    }
})

