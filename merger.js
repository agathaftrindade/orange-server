
function merge_spottings(services_res, config){
    if (services_res.size == 0)
        return 0
    // const ann_candidates = []
    const spottings = services_res
          .flatMap(serv => serv.resources
                   .map(spot => {
                       return {
                           ...spot,
			   name: serv.name,
                           weight: serv.weight || 1
                       }
                   })
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
                              count: curr.weight,
				                      voted_by: [curr.name]
                          }
                      ]
                  })
                  return acc
              }

              // console.log('join ', curr)
              cand_match = match.candidates.find(c => c.uri == curr.uri)
              if(cand_match){
                  cand_match.count += curr.weight
		              cand_match.voted_by.push(curr.name)
		          }else
                  match.candidates.push({
                      uri: curr.uri,
                      size: curr.size,
                      count: curr.weight || 1,
				              voted_by: [curr.name]
                  })

              return acc
          }, [])
          .filter(spot => { // Apply filter policies
              if(config.filter_policy == 'REMOVE_SINGLE_SPOTS'){
                  const is_single = spot.candidates.length == 1 && spot.candidates[0].voted_by.length == 1
                  return !is_single
              }
              return true
          })
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

