const TEXT = 'O Rio de Janeiro tem araras'
const ANNOTATIONS = [
	  {
		    'name': 'dbpedia',
		    'resources': [
			      {
				        'offset': 2,
				        'size': 3,
				        'uri': 'rio'
			      },
			      {
				        'offset': 9,
				        'size': 7,
				        'uri': 'janeiro'
			      },
			      {
				        'offset': 21,
				        'size': 5,
				        'uri': 'arara'
			      }
		    ]
	  },
	  {
		    'name': 'fox',
		    'resources': [
			      {
				        'offset': 9,
				        'size': 15,
				        'uri': 'rio_de_janeiro'
			      },
			      {
				        'offset': 21,
				        'size': 6,
				        'uri': 'arara'
			      }
		    ]
	  },
	  {
		    'name': 'fox2',
		    'resources': [
			      {
				        'offset': 9,
				        'size': 15,
				        'uri': 'rio_de_janeiro'
			      },
			      {
				        'offset': 21,
				        'size': 6,
				        'uri': 'arara'
			      }
		    ]
	  },
	  {
		    'name': 'tagme',
		    'resources': [
			      {
				        'offset': 9,
				        'size': 15,
				        'uri': 'rio_de_janeiro'
			      }
		    ]
	  },
	  {
		    'name': 'troll',
		    'resources': [
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
	  },
]

function merge_spottings(services_res){
    if (services_res.size == 0)
        return 0
    // const ann_candidates = []
    const spottings = services_res
          .flatMap(serv => serv.resources
                   .map(spot => ({
                       ...spot,
                   })
                       )
                  )
          .reduce((acc, curr) => {
              const match = acc.reverse().find(spot => Math.abs(spot.offset - curr.offset) <= 2)
              if(!match){
                  acc.push({
                      offset: curr.offset,
                      candidates: [
                          {
                              uri: curr.uri,
                              size: curr.size,
                              count: curr.weight || 1
                          }
                      ]
                  })
                  return acc
              }

              console.log('join ', curr)
              cand_match = match.candidates.find(c => c.uri == curr.uri)
              if(cand_match)
                  cand_match.count += (curr.weight || 1)
              else
                  match.candidates.push({
                      uri: curr.uri,
                      size: curr.size,
                      count: curr.weight || 1
                  })

              return acc
          }, [])
          .map(spot => {
              const chosen_one = spot.candidates
                    .sort((c1, c2) => {
                        // highest count
                        let a = c2.count - c1.count
                        if (a != 0) return a

                        // highest size
                        a = c2.size - c1.size
                        if (a != 0) return a

                        return a
                    })[0]
              return {
                  ...spot,
                  size: chosen_one.size,
                  uri: chosen_one.uri,
                  candidates: undefined,
                  _candidates: spot.candidates
              }
          })
          .sort((a, b) => {
              return a.offset - b.offset
          })

    return spottings
}

module.exports = {
    merge_spottings
}

// const ann = merge(ANNOTATIONS)
// console.log(TEXT)
// console.log(JSON.stringify(ann, null, 2))

