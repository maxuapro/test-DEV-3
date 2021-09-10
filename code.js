// ------------------------------ INITS ------------------------------

const defaultString = 'Hello Darkness my old friend'
const inp = document.getElementById('inp')
const btn = document.getElementById('btn')
const clr = document.getElementById('clr')
const output = document.getElementById('output')

document
    .getElementById('getstrbutton')
    .addEventListener('click', () => {
        inp.value = defaultString
    })

let list = []

// mouseinits
let indexMouseOver = 0
let indexItemGrabbed = 0
let isDragging = false

//  ---------------------------- FUNCTIONS ----------------------------

const getGrabbedIndex = (index) => {
    indexItemGrabbed = index
    list[index].style.color = 'grey'
    isDragging = true
}
const clearGrabbedIndex = () => {
    list[indexItemGrabbed].style.color = 'black'
    indexItemGrabbed = 0
    isDragging = false
}

// reshape array function
// switches indexes between the grabbed item and the chosen one
function reshape(array, indexGrabbed, indexChosen) {
    let grabbed = array.slice(indexGrabbed, indexGrabbed + 1)[0]
    let chosen = array.slice(indexChosen, indexChosen + 1)[0]
    array[indexChosen] = grabbed
    array[indexGrabbed] = chosen
    return array
}

const reshapeTheOutput = () => {
    console.log('reshapeTheOutput is run on index', indexMouseOver)
    let reshapedArrayOfKids = reshape(list, indexItemGrabbed, indexMouseOver)
    for (let kid of reshapedArrayOfKids) {
        output.appendChild(kid)
    }
    clearGrabbedIndex()
}

// MAIN FUNC
const getString = () => {

    if (!inp.value) {
        return
    }
    // -clear inits------ 
    list = []
    output.innerHTML = ''
    // ------------------

    const theLine = inp.value
    inp.value = ''

    const strArr = theLine.split('')

    for (let el of strArr) {
        let txtNode = document.createElement('h1')
        txtNode.setAttribute('class', 'draggable')
        txtNode.innerHTML = el
        txtNode.onmouseover = () => {
            if (isDragging) {
                txtNode.style.color = 'red'
            }
            indexMouseOver = list.indexOf(txtNode)
        }
        txtNode.onmouseout = () => {
            if (list.indexOf(txtNode) !== indexItemGrabbed) {
                txtNode.style.color = 'black'
            }
            indexMouseOver = 0
        }
        // get the grabbed index
        txtNode.addEventListener('mousedown', () => {
            getGrabbedIndex(list.indexOf(txtNode))
        })
        // choose the index and reshape
        txtNode.addEventListener('mouseup', () => {
            reshapeTheOutput()
        })
        //
        output.appendChild(txtNode)
    }
    list = [...output.childNodes]
}

const clearString = () => {
    inp.value = ''
    output.innerHTML = ''
}

btn.addEventListener('click', getString)
clr.addEventListener('click', clearString)