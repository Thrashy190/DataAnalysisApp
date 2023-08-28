use crate::database::mongo_service::MongoService;
use crate::models::user_model::User;
use futures_util::stream::TryStreamExt;
use mongodb::{
    bson,
    bson::{doc, Document},
    error::Error,
    options::FindOptions,
};

pub struct UserService {
    mongo_service: MongoService,
}

impl UserService {
    pub async fn new() -> Result<Self, Error> {
        let mongo_service = MongoService::new().await?;
        Ok(Self { mongo_service })
    }

    pub async fn get_all(&self) -> Result<Vec<User>, Error> {
        let find_options = FindOptions::builder()
            .sort(doc! { "create_at": -1 })
            .build();

        let cursor = self
            .mongo_service
            .collection("users")
            .find(None, find_options)
            .await?;

        let users: Vec<User> = cursor
            .try_collect::<Vec<Document>>()
            .await?
            .into_iter()
            .map(|doc| bson::from_bson(bson::Bson::Document(doc)).unwrap())
            .collect();

        Ok(users)
    }

    pub async fn update_terms_and_conditions(&self, identifier: String) -> Result<(), Error> {
        let update = doc! { "$set": { "accept_terms_and_conditions": true } };

        let _cadet = self
            .mongo_service
            .collection::<Document>("users")
            .update_one(doc! { "identifier": identifier }, update, None)
            .await?;
        Ok(())
    }
}
