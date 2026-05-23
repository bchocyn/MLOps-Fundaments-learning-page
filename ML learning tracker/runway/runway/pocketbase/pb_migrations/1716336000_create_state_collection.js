/// Migration: create "state" collection for Runway tracker
/// PocketBase will auto-run this on startup if placed in pb_migrations/

migrate((db) => {
  const collection = new Collection({
    "id": "runway_state_001",
    "name": "state",
    "type": "base",
    "system": false,
    "schema": [
      {
        "name": "user",
        "type": "relation",
        "required": true,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": ["email"]
        }
      },
      {
        "name": "data",
        "type": "json",
        "required": false,
        "options": { "maxSize": 2000000 }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX idx_state_user ON state (user)"
    ],
    "listRule": "@request.auth.id = user.id",
    "viewRule": "@request.auth.id = user.id",
    "createRule": "@request.auth.id = user.id",
    "updateRule": "@request.auth.id = user.id",
    "deleteRule": "@request.auth.id = user.id"
  });
  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("state");
  return dao.deleteCollection(collection);
});
