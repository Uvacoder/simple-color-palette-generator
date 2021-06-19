const randomBtn = document.querySelector('.btn')
const colorPalette = document.querySelector('.color-palette')
const copyAlert = document.querySelector('.alert')

// generate color scheme
function getColorScheme() {
    const baseColor = generateRandomHexCode()

    let scheme = new ColorScheme()
    scheme.from_hex(baseColor).scheme('triade').variation('default')

    return scheme.colors().splice(0, 6)
}

// generate the color palette
function generatePalette() {
    const colors = getColorScheme()

    const generatedColor = colors.forEach((color) => {
        const colorDiv = document.createElement('article')
        colorDiv.className = 'color'

        const bg = '#' + color

        // get each color code color name
        let ntcMatch = ntc.name(bg)

        colorDiv.innerHTML = `
            <div></div>
            <h2>#f9aca7</h2>
            <p>rebeccapurple</p>
        `

        colorDiv.children[0].style.background = bg
        colorDiv.children[1].textContent = bg
        // name generated from the ntc script
        colorDiv.children[2].textContent = ntcMatch[1]

        colorPalette.appendChild(colorDiv)
    })

    return generatedColor
}

// render the generated palette to the dom
function renderGeneratedPalette() {
    colorPalette.innerHTML = ''

    generatePalette()
}

// generate color palette on clicking spacebar
function activateSpacebar(e) {
    // if spacebar is not clicked, return
    if (e.keyCode !== 32) return

    renderGeneratedPalette()
}

// copy color
function copy(color) {
    const textarea = document.createElement('textarea')
    textarea.value = color
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)

    copyAlert.classList.add('copied')
    copyAlert.textContent = `Color ${color} has been copied to your clipboard`

    setTimeout(() => {
        copyAlert.classList.remove('copied')
    }, 2000)
}

// copy color when each color is clicked
function copyColor(e) {
    if (!e.target.nextElementSibling) return
    if (e.target.tagName === 'H2') return
    if (e.target.className === 'color-palette') return

    console.log(e.target)

    const color = e.target.nextElementSibling.textContent

    copy(color)
}

// randomly generate hex color codes
function generateRandomHexCode() {
    return (Math.random().toString(16) + '000000').substring(2, 8)
}

// copy color palette on clicking the 's' key
function copyPalette(e) {
    if (e.keyCode !== 67) return
    const color = getColorScheme().toString()

    copy(color)
}

randomBtn.addEventListener('click', renderGeneratedPalette)
colorPalette.addEventListener('click', copyColor)
document.addEventListener('keydown', activateSpacebar)
document.addEventListener('keydown', copyPalette)

// create palette on load
renderGeneratedPalette()
