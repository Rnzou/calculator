import { gsap } from "gsap"
import CSSRulePlugin from "gsap/CSSRulePlugin";
gsap.registerPlugin(CSSRulePlugin)

import { data } from "./data"
import { css } from "./css"

class Animation {
    btnpress(dom) {
        if (dom) {
            dom.classList.remove('mousedown')
            dom.classList.add('mousedown')
        }
        else {
            console.log("cannot find dom")
        }
    }
    btnrelease(dom) {
        if (dom) {
            dom.classList.remove('mousedown')
        }
        else {
            console.log("cannot find dom")
        }
    }

    // switch theme //
    switchTheme({ toDark = true, switchdurantion=0, backgroundduration=0, calculatorduration=0, calculatorDelay = 0 }) {
        if(toDark){
            this.buttontoDark({duration: switchdurantion})
            this.backgroundtoDark({duration: backgroundduration})
            this.calculatortoDark({duration: calculatorduration, delay: calculatorDelay})
        }else{
            this.buttontoLight({duration: switchdurantion})
            this.backgroundtoLight({duration: backgroundduration})
            this.calculatortoLight({duration: calculatorduration, delay: calculatorDelay})
        }
    }

    // ------------------to light animation------------------ //

    buttontoLight({ tween = gsap.timeline(), duration = 0 }) {
         tween.to('#sun', {duration, ease: "power2", y:40, opacity:0,
         display:"none"})
         tween.to('#moon', {duration:0, ease: "power2", y:-40, opacity:0,
         display:"none"})
         tween.to('#moon', {duration, ease: "power2", y:0, opacity:1,
         display:"block"})
    }

    backgroundtoLight({ tween = gsap.timeline(), duration = 0 }) {
        tween.to('body', {duration, background: css.lightPrimaryColor})
    }

    calculatortoLight({ tween = gsap.timeline(), duration = 0 ,delay = 0 }) {
        this.calculatorbackgroundtoLight({ tween, duration })
        this.calculatorbuttontoLight({ tween, duration, delay })
    }
    // button background 
    calculatorbackgroundtoLight({ tween = gsap.timeline(), duration = 0 }) {
        tween.to('.calculator', { duration, boxShadow: css.lightCalculatorBgShadow})
    }
    // button Z-MOVE 
    calculatorbuttontoLight({ tween = gsap.timeline(), duration = 0, delay = 0}) {
        data.orderList.forEach((btnInfo, index) => {
            this.calculatorBtnGroundToLight({ btnInfo, duration, delay: index * delay})
            this.calculatorBtnSurfaceToLight({ btnInfo, duration, delay: index * delay})
        })
    }
    calculatorBtnGroundToLight({ btnInfo, tween = gsap.timeline(), duration = 0, delay = 0}) {
        const id = `#${btnInfo.id}`
        let background = css.lightSpanBackgroundLinear
        switch (btnInfo.id) {
            case 'clear':
                background = css.clearColor
                break;
            case 'delete':
                background = css.deleteColor
                break;
            case 'equal':
                background = css.equalColor
                break
        }
        tween.to(id, { duration, delay, background })
    }
    
    calculatorBtnSurfaceToLight({ btnInfo, tween = gsap.timeline(), duration = 0, delay = 0}) {
        const id = CSSRulePlugin.getRule(`#${btnInfo.id}::before`)
        tween.to(id, {
            duration, delay,
            color: css.lightTextColor,
            textShadow: css.lightTextShadow,
            background: css.lightSpanBeforeBackgroundLinear,
            boxShadow: css.lightSpanBeforeBoxShadow,
            borderTop: css.lightSpanBeforeBorder,
            borderBottom: css.lightSpanBeforeBorder,
            borderLeft: css.lightSpanBeforeBorder
        })
    }

    // ------------------to dark animation------------------ //

    buttontoDark({ tween = gsap.timeline(), duration = 0 }) {
        tween.to('#moon', {duration, ease: "power2", y:40, opacity:0,
         display:"none"})
         tween.to('#sun', {duration:0, ease: "power2", y:-40, opacity:0,
         display:"none"})
         tween.to('#sun', {duration, ease: "power2", y:0, opacity:1,
         display:"block"})
    }

    backgroundtoDark({ tween = gsap.timeline(), duration = 0}) {
        tween.to('body', { duration, background: css.darkPrimaryColor })
    }
    
    calculatortoDark({ tween = gsap.timeline(), duration = 0, delay = 0}) {
        this.calculatorbackgroundtoDark({ tween, duration })
        this.calculatorbuttontoDark({ tween, duration, delay })
    }
    // button background 
    calculatorbackgroundtoDark({ tween = gsap.timeline(), duration = 0}) {
        tween.to('.calculator', {duration, boxShadow: css.darkCalculatorBgShadow})
    }
    // button Z-MOVE 
    calculatorbuttontoDark({ tween = gsap.timeline(), duration = 0, delay = 0}) {
        data.orderList.slice().reverse().forEach((btnInfo, index) => {
            this.calculatorBtnGroundTodark({ btnInfo, duration, delay: index * delay})
            this.calculatorBtnSurfaceTodark({ btnInfo, duration, delay: index * delay})
        })
    }
    calculatorBtnGroundTodark({ btnInfo, tween = gsap.timeline(), duration = 0, delay = 0}) {
        const id = `#${btnInfo.id}`
        let background = css.darkSpanBackgroundLinear
        switch (btnInfo.id) {
            case 'clear':
                background = css.clearDeepColor
                break;
            case 'delete':
                background = css.deleteDeepColor
                break;
            case 'equal':
                background = css.equalDeepColor
                break
        }
        tween.to(id, { duration, delay, background })
    }

    calculatorBtnSurfaceTodark({ btnInfo, tween = gsap.timeline(), duration = 0, delay = 0}) {
        const id = CSSRulePlugin.getRule(`#${btnInfo.id}::before`)
        tween.to(id, {
            duration, delay,
            color: css.darkTextColor,
            textShadow: css.darkTextShadow,
            background: css.darkSpanBeforeBackgroundLinear,
            boxShadow: css.darkSpanBeforeBoxShadow,
            borderTop: css.darkSpanBeforeBorder,
            borderBottom: css.darkSpanBeforeBorder,
            borderLeft: css.darkSpanBeforeBorder
        })
    }
}

const animation = new Animation()

export { animation }