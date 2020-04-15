var canvas = document.getElementById("array-canvas")

function init(){
    let dpi = window.devicePixelRatio
    // get CSS height and width
    let style_height = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2)
    let style_width = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2)
    
    // scale the canvas
    canvas.setAttribute('height', style_height * dpi)
    canvas.setAttribute('width', style_width * dpi)

    constructArray()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

var alg = 'bubble'
function change_alg(obj){
    alg = obj.value
    closeAllDropDown()
}

function sort()
{
    switch (alg){
        case 'bubble':
            bubbleSort(arr);
            break;
        case 'insertion':
            insertionSort(arr);
            break;
    }
    
}

async function bubbleSort(arr){
    var sorted = false;
    do {
        sorted = true
        for (var i = 0; i < arr.length - 1; ++i){
            if (arr[i] > arr[i + 1]){
                sorted = false
                let temp = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = temp
                drawArr(arr, i + 1)
                await sleep(50);
            }
        }
    } while (!sorted);
    drawArr(arr, -1, 'green')
    await sleep(100)
    drawArr(arr)
}

async function insertionSort(arr){
    for (var i = 1; i < arr.length; ++i){
        var j = i;
        while (arr[j] < arr[j - 1]){
            var temp = arr[j];
            arr[j] = arr[j - 1]
            arr[j - 1] = temp
            drawArr(arr, j - 1)
            await sleep(50)
            if (j - 1 == 0){
                break
            }
            j--;
        }
    }
    drawArr(arr, -1, 'green')
    await sleep(1000)
    drawArr(arr)
}

var arr = []
arr_length = 20
top_limit = 500
max_num = 0
function constructArray(){
    arr = []
    for (var i = 0; i < arr_length; ++i){
        arr.push(Math.floor(Math.random() * top_limit))
        if (max_num < arr[i]){
            max_num = arr[i]
        }
    }
    drawArr(arr)
}

function drawArr(arr, movedpiece=-1, color=-1){
    var ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    var block_size = canvas.width / arr.length
    var block_height = canvas.height * 9 / 10 / max_num
    var padding = Math.ceil(block_size / 10)
    ctx.font = block_size / 5 + 'px Arial'
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.0)'
    ctx.textAlign = "center"
    
    for (var i = 0; i < arr.length; ++i)
    {
        ctx.fillStyle = "#282828";
        if (movedpiece == i){
            ctx.fillStyle = "#FF0000"
        }
        if (color != -1){
            ctx.fillStyle = color
        }
        ctx.fillRect(block_size * i + padding, 0, block_size - padding * 2, canvas.height / 10 + block_height * arr[i])
        if (arr.length <= 20){
            ctx.moveTo(block_size * i + block_size / 2, canvas.height / 10 + block_height * arr[i] - 30)
            ctx.lineTo(block_size * i + block_size / 2, canvas.height / 10 + block_height * arr[i] - 2)
            ctx.stroke()
            ctx.fillStyle = "#F0F0F0"
            ctx.fillText(arr[i], block_size * i + block_size / 2, canvas.height / 10 + block_height * arr[i] - 10, block_size)
        }
    }
}

function changeText(obj, textId){
    document.getElementById(textId).value = obj.value
    arr_length = parseInt(obj.value)
}

function closeAllDropDown(){
    var dropdowns = document.getElementsByClassName('dropdown-content')
    for (var i = 0; i < dropdowns.length; ++i){
        if (dropdowns[i].classList.contains('show')){
            dropdowns[i].classList.remove('show')
        }
    }
}

window.onclick = function(event){
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropdown-content') && !event.target.matches('.dropdown-object')){
        var dropdowns = document.getElementsByClassName('dropdown-content')
        for (var i = 0; i < dropdowns.length; ++i){
            if (dropdowns[i].classList.contains('show')){
                dropdowns[i].classList.remove('show')
            }
        }
    }
}

function dropDown(obj){
    closeAllDropDown()
    document.getElementById(obj.value).classList.toggle('show')
}