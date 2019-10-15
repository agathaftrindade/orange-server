const util = require('util')
const request = require('request')

const request_ = util.promisify(request)

const ANNOTATIONS = {
		resources: [
			  {
				    'offset': 2,
				    'size': 3,
				    'uri': 'rio'
			  },
			  {
				    'offset': 9,
				    'size': 7,
				    'uri': 'luke_skywalker'
			  },
			  {
				    'offset': 21,
				    'size': 5,
				    'uri': 'cars_the_movie'
			  }
		]
}

// const ANNOTATIONS = [
// 	  {
// 		    'name': 'dbpedia',
// 		    'resources': [
// 			      {
// 				        'offset': 2,
// 				        'size': 3,
// 				        'uri': 'rio'
// 			      },
// 			      {
// 				        'offset': 9,
// 				        'size': 7,
// 				        'uri': 'janeiro'
// 			      },
// 			      {
// 				        'offset': 21,
// 				        'size': 5,
// 				        'uri': 'arara'
// 			      }
// 		    ]
// 	  },
// 	  {
// 		    'name': 'fox',
// 		    'resources': [
// 			      {
// 				        'offset': 2,
// 				        'size': 15,
// 				        'uri': 'rio_de_janeiro'
// 			      },
// 			      {
// 				        'offset': 21,
// 				        'size': 6,
// 				        'uri': 'arara'
// 			      }
// 		    ]
// 	  },
// 	  {
// 		    'name': 'fox2',
// 		    'resources': [
// 			      {
// 				        'offset': 2,
// 				        'size': 15,
// 				        'uri': 'rio_de_janeiro'
// 			      },
// 			      {
// 				        'offset': 21,
// 				        'size': 6,
// 				        'uri': 'arara'
// 			      }
// 		    ]
// 	  },
// 	  {
// 		    'name': 'tagme',
// 		    'resources': [
// 			      {
// 				        'offset': 2,
// 				        'size': 15,
// 				        'uri': 'rio_de_janeiro'
// 			      }
// 		    ]
// 	  },
// 	  {
// 		    'name': 'troll',
// 		    'resources': [
// 			      {
// 				        'offset': 2,
// 				        'size': 3,
// 				        'uri': 'rio'
// 			      },
// 			      {
// 				        'offset': 9,
// 				        'size': 7,
// 				        'uri': 'luke_skywalker'
// 			      },
// 			      {
// 				        'offset': 21,
// 				        'size': 5,
// 				        'uri': 'cars_the_movie'
// 			      }
// 		    ]
// 	  },
// ]

module.exports = class MockConnector{
    constructor(){
    }
    do_request({url, text}){
        return Promise.resolve(ANNOTATIONS)
    }
}
