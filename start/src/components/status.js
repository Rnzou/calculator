import { data } from './data'
import { dom } from './dom'


class Status {
    // current input //
    static currentInputInfo = null
    // current input status //
    static currentInputStatus = Status._getEachTimeInputStatus()
    // current dom //
    static currentInputDomValue = Status.getInputDomValue()
    // current splited dom //
    // for example, 96 + 56, it would be split into '96' '+' '56' //
    static currentInputDomSplit = Status.getInputDomValueSplit()
    // current splited dom (optmized)) //
    static currentInputDomSplitOptmize = Status._getInputDomValueSplitOptmize()

    static lastInputShowResult = false

    static generate(currentInputInfo) {
        Status.currentInputInfo = currentInputInfo
        Status.currentInputStatus = Status._getEachTimeInputStatus()
        Status.currentInputDomValue = Status.getInputDomValue()
        Status.currentInputDomSplit = Status.getInputDomValueSplit()
        Status.currentInputDomSplitOptmize = Status._getInputDomValueSplitOptmize()
    }

    static _getEachTimeInputStatus() {
        return data.getInpurStatus(Status.currentInputInfo)
    }

    static getInputDomValue() {
        return dom.getInputDom().value
    }

    static getInputDomValueSplit(optmize = false) {
        return data.analysisString(Status.getInputDomValue(), optmize)
    }

    static _getInputDomValueSplitOptmize() {
        return data.optimize(Status.currentInputDomSplit)
    }
}

export { Status }