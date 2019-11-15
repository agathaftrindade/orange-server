const rdf = require('rdf')
const rdfenv = require('rdf').environment

// function _get_profile(){
//     const profile = rdf.environment.createProfile();
//     profile.setDefaultPrefix('http://example.com/');

//     profile.setPrefix('rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns');
//     profile.setPrefix('rdfs', 'http://www.w3.org/2000/01/rdf-schema');
//     profile.setPrefix('xsd', 'http://www.w3.org/2001/XMLSchema');
//     profile.setPrefix('nif', 'http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#');
//     profile.setPrefix('itsrdf', 'http://www.w3.org/2005/11/its/rdf');

//     return profile
// }

const PREFIXES = {
    "http" : "http",
    "schema" : "http://schema.org/",
    "xsd" : "http://www.w3.org/2001/XMLSchema#",
    "its" : "http://www.w3.org/2005/11/its/rdf#",
    "nif" : "http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#",
    "rdfs" : "http://www.w3.org/2000/01/rdf-schema#",
    "foxo" : "http://ns.aksw.org/fox/ontology#",
    "dbo" : "http://dbpedia.org/ontology/",
    "oa" : "http://www.w3.org/ns/oa#",
    "foxr" : "http://ns.aksw.org/fox/resource#",
    "dbr" : "http://dbpedia.org/resource/",
    "rdf" : "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "prov" : "http://www.w3.org/ns/prov#",
    "foaf" : "http://xmlns.com/foaf/0.1/"
}

function _get_rdf_fields(){
    const NIF_P = 'http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#'
    const ITSRDF_P = 'http://www.w3.org/2005/11/its/rdf#'
    const d = {
        text: `${NIF_P}isString`,
        offset: `${NIF_P}beginIndex`,
        endIndex: `${NIF_P}endIndex`,
        uri: `${ITSRDF_P}taIdentRef`,
    }
    Object.entries(d).forEach(([k, v]) => {
        d[v] = k
    })
    return d
}

function string_to_object(s){
    const parsed = rdf.TurtleParser.parse(s, 'http://example.com/')
    return nif_to_object(parsed.graph.toArray())
}

function nif_to_object(triples){
    const subjs = {}
    console.log(triples)
    triples
        .map(t => [t.subject.nominalValue, t.predicate.nominalValue, t.object.nominalValue])
        .forEach(
        ([subj, pred, obj]) => {
            if(!subjs[subj])
                subjs[subj] = {}

            // console.log(pred)
            // console.log()
            pred = _get_rdf_fields()[pred] || pred

            subjs[subj][pred] = obj
        })
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
    PREFIXES,
    string_to_object,
    nif_to_object
}
