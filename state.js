/* State */
const state = {
  color: '#23C1B2',
  solvedLevels: [],
}

state.load = function() {
  if (localStorage.solvedLevels)
    state.solvedLevels = JSON.parse(localStorage.getItem('solvedLevels'))
}

state.save = function() {
  localStorage.setItem('solvedLevels', JSON.stringify(state.solvedLevels))
}

export default state