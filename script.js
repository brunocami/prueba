const getData = (method, url, id) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.send()
    
    xhr.addEventListener("load", () => {
        if(xhr.status === 200) {
            renderData(id, xhr.response)
        } else {
            console.log("algo salio mal")
        }
    })
}

const renderData = (id, data) => {
    document.getElementById(id).innerHTML = data;
}

// renderData('root', getData('get', './section_01.html'))

document.getElementById("btn1").addEventListener("click", () => {
    getData('get', './section_01.html', 'root')    
    newState(null, 'title1', 'section_01')
})

document.getElementById("btn2").addEventListener("click", () => {
    getData('get', './section_02.html', 'root')   
    newState(null, 'title2', 'section_02') 
})

document.getElementById("btn3").addEventListener("click", () => {
    getData('get', './section_03.html', 'root')    
    newState(null, 'title3', 'section_03')
})

// STATE
//pushstate
//window.history.pushState('')

const newState = (state, title, url) => {
    history.pushState(state, title, url)
}

//Popstate

const createPath = () => {
    const path = window.location.pathname.split("/")[2]
    return path
}

window.addEventListener('popstate', ()=> {
    const path = createPath()
    if(path != undefined && path != '' && path != 'index.html'){
        getData('get', `./${path}.html`, 'root')
    } else {
        window.location = 'index.html'
    }
    console.log(createPath())
})

const getApi = (method, url) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.send()

    xhr.addEventListener("load", () => {
        if(xhr.status === 200) {

            const listaJSON = xhr.response
            const lista = JSON.parse(listaJSON)

            console.log(lista)

            const keyFrag = new DocumentFragment
            lista.forEach(element => {
                const li = document.createElement('li')
                li.textContent = `${element.casa.nombre}= compra: ${element.casa.compra} venta: ${element.casa.venta}`
                keyFrag.appendChild(li)
            })
            console.log(keyFrag)
            document.getElementById("dolar").appendChild(keyFrag)
        } else {
            console.log("error")
        }
    })
}

    getApi('get', 'https://www.dolarsi.com/api/api.php?type=valoresprincipales')
// setInterval(() => {
//     getApi('get', 'https://www.dolarsi.com/api/api.php?type=valoresprincipales')
//     console.log('Actulizado')
// }, 2000)

// LIBRERIAS Y FRAMEWORKS

 

