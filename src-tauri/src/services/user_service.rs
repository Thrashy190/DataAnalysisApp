use mongodb::{bson::{doc,Document}, error::Error, bson, options::FindOptions};
use crate::models::user_model::User;
use crate::database::mongo_service::MongoService;
use futures_util::stream::TryStreamExt;

pub struct UserService {
    mongo_service: MongoService,
}

impl UserService {
    pub async fn new() -> Result<Self, Error> {
        let mongo_service = MongoService::new().await?;
        Ok(Self { mongo_service })
    }

    pub async fn get_all(&self) -> Result<Vec<User>, Error> {

        let find_options = FindOptions::builder().sort(doc! { "create_at": -1 }).build();

        let cursor = self.mongo_service.collection("users").find(None,find_options).await?;

        let users: Vec<User> = cursor
            .try_collect::<Vec<Document>>()
            .await?
            .into_iter()
            .map(|doc| bson::from_bson(bson::Bson::Document(doc)).unwrap())
            .collect();

        Ok(users)
    }

}