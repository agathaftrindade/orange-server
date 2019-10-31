function nif_to_object(triples){
    const subjs = {}
    triples.map(t => t.toString().split('> <')).forEach(
        ([subj, pred, obj]) => {
            if(!subjs[subj])
                subjs[subj] = {}
            subjs[subj][pred] = obj
        })
    console.log(subjs)
    const l = Object.entries(subjs)
        .map(([k, val]) => {
            return {
                id: k,
                ...val
            }
        })
    return l
}

module.exports = {
    nif_to_object
}
