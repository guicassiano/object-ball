const palco = document.getElementById("palco")
const numObjetos = document.getElementById("numObjetos")
const qtde = document.getElementById("qtde")
const btnAdd = document.getElementById("btnAdd")
const btnRemover = document.getElementById("btnRemover")

let larguraPalco = palco.offsetWidth
let alturaPalco = palco.offsetHeight
let bolas = []
let numBola = 0

class Bola{
    constructor(arrayBolas,palco){
        this.tamanho = Math.floor(Math.random()*10)+10
        this.r = Math.floor(Math.random()*255)
        this.g = Math.floor(Math.random()*255)
        this.b = Math.floor(Math.random()*255)
        this.x = Math.floor(Math.random()*(larguraPalco-this.tamanho))
        this.y = Math.floor(Math.random()*(alturaPalco-this.tamanho))
        this.velX = Math.floor(Math.random()*4)+0.5
        this.velY = Math.floor(Math.random()*2)+0.5
        this.dirX = Math.floor(Math.random()*10)>5?1:-1
        this.dirY = Math.floor(Math.random()*10)>5?1:-1
        this.arrayBolas = arrayBolas
        this.palco = palco
        this.id = Date.now() + "_" + Math.floor(Math.random()*100000000000000000000000000000)
        this.desenhar()
        this.controle = setInterval(this.controlar,10)
        this.eu = document.getElementById(this.id)
        numBola++
        numObjetos.innerHTML = numBola
    }
    minhaPos = ()=>{
        return this.arrayBolas.indexOf(this)
    }
    remover = ()=>{
        clearInterval(this.controle)
        bolas = bolas.filter((element)=>{
            if(element.id != this.id){
                return element
            }
        })
        this.eu.remove()
        numBola--
        numObjetos.innerHTML = numBola
    }
    desenhar = ()=>{
        const div = document.createElement("div")
        div.setAttribute("id",this.id)
        div.setAttribute("class","bola")
        div.setAttribute("style",`left:${this.x}px; top:${this.y}px; width:${this.tamanho}px;height:${this.tamanho}px;background-color:rgb(${this.r},${this.g},${this.b})`)
        palco.appendChild(div)
    }
    controleBordas = ()=>{
        if(this.x + this.tamanho >= larguraPalco){
            this.dirX = -1
        }else if(this.x <= 0){
            this.dirX = 1
        }
        if(this.y + this.tamanho >= alturaPalco){
            this.dirY = -1
        }else if(this.y <= 0){
            this.dirY = 1
        }
    }
    controlar = ()=>{
        this.controleBordas()
        this.x += this.dirX * this.velX
        this.y += this.dirY * this.velY
        this.eu.setAttribute("style",`left:${this.x}px; top:${this.y}px; width:${this.tamanho}px;height:${this.tamanho}px;background-color:rgb(${this.r},${this.g},${this.b})`)
        if((this.x > larguraPalco)||(this.y > alturaPalco)){
            this.remover()
        }
    }
}

window.addEventListener("resize",()=>{
    larguraPalco = palco.offsetWidth
    alturaPalco = palco.offsetHeight
})

btnAdd.addEventListener("click",()=>{
    for(let i = 0;i < qtde.value; i++){
        bolas.push(new Bola(bolas,palco))
    }
})

btnRemover.addEventListener("click",()=>{
    bolas.map((element)=>{
        element.remover()
    })
})