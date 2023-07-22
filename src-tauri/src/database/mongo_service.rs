use mongodb::{error::Error, Client, Database, Collection};

pub struct MongoService {
    db: Database,
}

impl MongoService {
    pub async fn new() -> Result<Self, Error> {
        let client = Client::with_uri_str("mongodb://localhost:27017").await?;
        let db = client.database("policeDB");
        Ok(Self { db })
    }

    pub fn collection<T>(&self, name: &str) -> Collection<T> {
        self.db.collection(name)
    }

}