import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("placess.db");
export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS placess (
                id INTEGER PRIMARY KEY NOT NULL ,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lag REAL NOT NULL
            )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  console.log(place);
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO placess (title, imageUri, address, lat, lag) VALUES (
            ?,?,?,?,?
        )`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM placess`,
        [],
        (_, result) => {
          const places = [];
          for (const place of result.rows._array) {
            places.push(
              new Place(
                place.title,
                place.imageUri,
                {
                  address: place.address,
                  lat: place.lat,
                  lng: place.lng,
                },
                place.id
              )
            );
          }
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM placess WHERE id = ? `,
        [id],
        (_, result) => {
          const dbPlace = result.rows._array[0];
          const place = new Place(
            dbPlace.title,
            dbPlace.imageUri,
            { lat: dbPlace.lat, lng: dbPlace.lng },
            dbPlace.id
          );
          resolve(place);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
