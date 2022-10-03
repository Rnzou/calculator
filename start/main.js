import './style.css'
 
import { data } from './src/components/data'
import { dom } from './src/components/dom'
import { animation } from './src/components/animation'
import { calculator } from './src/components/calculator'

// assing tags to calculator 
data.info.forEach(element => {
    if (dom.haveByID(element.id)) {
        document.styleSheets[0].insertRule(`#${element.id}::before{content: "${element.tag}"; border: none;}
        `)
    }
});

// animation(mouse) for pressing and releasing the button
dom.button.forEach(domBtn => {
    domBtn.addEventListener('mousedown', () => {
        animation.btnpress(domBtn)
    })
    domBtn.addEventListener('mouseup', () => {
        animation.btnrelease(domBtn)
    })
    domBtn.addEventListener('mouseout', () => {
        animation.btnrelease(domBtn)
    })
})

// animation(keyboard) for pressing and releasing the button //
// https://www.javascripttutorial.net/javascript-dom/javascript-keyboard-events/ //
// event explanation //
data.info.forEach(info => {
    window.addEventListener('keydown' , (event) => {
        info.key.forEach(key => {
            if(event.key === key && dom.getByID(info.id)) {
                animation.btnpress(dom.getByID(info.id))
                // add keyboard event to every button //
                calculator.analysisEachTimeInput(info)
            }
        })
    })
    window.addEventListener('keyup' , (event) => {
        info.key.forEach(key => {
            if(event.key === key && dom.getByID(info.id)) {
                animation.btnrelease(dom.getByID(info.id))
            }
        })
    })
    // add click event to every button //
    dom.getByID(info.id)?.addEventListener('click', () => {
        calculator.analysisEachTimeInput(info)
    })
})

// sun and moon theme switch //

animation.switchTheme({ toDark: true })

dom.toggle.sun.addEventListener('click', () => {
    animation.switchTheme({ toDark: false, 
        switchdurantion: 1, 
        backgroundduration: 1.5, 
        calculatorduration: 0.5,
        calculatorDelay: 0.05})
})

dom.toggle.moon.addEventListener('click', () => {
    animation.switchTheme({ toDark: true, 
        switchdurantion: 1, 
        backgroundduration: 1.5, 
        calculatorduration: 0.5,
        calculatorDelay: 0.05})
})


