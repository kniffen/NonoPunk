export default function createEventEmitter() {
  const eventEmitter = {
    events: []
  }

  eventEmitter.on = function(id, cb) {
    eventEmitter.events.push({
      id: `${id}-${eventEmitter.events.filter(event => event.id.includes(id + '-')).length}`,
      cb,
    })
  }

  eventEmitter.emit = function(id, ...data) {
    const events = eventEmitter.events.filter(event => event.id.includes(id + '-'))
    
    if (events.length < 1) return

    for (const event of events)
      event.cb(...data)
  }

  return eventEmitter
}