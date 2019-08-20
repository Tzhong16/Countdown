import moment from 'moment';
import Constants from 'expo-constants';
const uuidv1 = require('uuid/v1');

const { manifest } = Constants;
const api = manifest.packagerOpts.dev
  ? manifest.debuggerHost
      .split(`:`)
      .shift()
      .concat(`:3005`)
  : `localhost:3005`;

const url = `http://${api}/events`;
// const url = `http://localhost:3005/events`;

export function getEvents() {
  return fetch(url)
    .then(response => response.json())
    .then(events => events.map(e => ({ ...e, date: new Date(e.date) })))
    .catch(err => console.log(err));
}

export function saveEvent({ title, date }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title,
      date,
      id: uuidv1()
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error));
}

export function formatDate(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format('D MMM YYYY');
}

export function getCountdownParts(eventDate) {
  const duration = moment.duration(
    moment(new Date(eventDate)).diff(new Date())
  );
  return {
    days: parseInt(duration.as('days')),
    hours: duration.get('hours'),
    minutes: duration.get('minutes'),
    seconds: duration.get('seconds')
  };
}

export function formatDateTime(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format('H A on D MMM YYYY');
}
