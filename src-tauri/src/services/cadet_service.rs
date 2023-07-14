use mongodb::{bson::{doc,Document}, error::Error, bson, options::FindOptions};
use crate::database::mongo_service::MongoService;
use futures_util::stream::TryStreamExt;
use crate::models::cadet_model::Cadet;

pub struct CadetService {
    mongo_service: MongoService,
}

impl CadetService {
    pub async fn new() -> Result<Self, Error> {
        let mongo_service = MongoService::new().await?;
        Ok(Self { mongo_service })
    }

    pub async fn get_cadet(&self,identifier: String) -> Result<Document, Error> {

        let filter = doc! { "identifier": identifier };

        let cadet = self.mongo_service.collection("cadets").find_one(filter,None).await?;

        Ok(cadet.unwrap())
    }

    pub async fn get_cadets(&self) -> Result<Vec<Document>, Error> {

        let find_options = FindOptions::builder().sort(doc! { "create_at": -1 }).build();

        let cursor = self.mongo_service.collection("cadets").find(None,find_options).await?;

        let cadets: Vec<Document> = cursor
            .try_collect::<Vec<Document>>()
            .await?
            .into_iter()
            .map(|doc| bson::from_bson(bson::Bson::Document(doc)).unwrap())
            .collect();

        Ok(cadets)
    }

    pub async fn create_cadet(&self, cadet:Cadet) -> Result<(), Error> {
        let user_doc = doc! {
            "identifier":&cadet.identifier,
            "genre":&cadet.genre,
            "level":&cadet.level,
            "birth":&cadet.birth,
            "relationship":&cadet.relationship,
            "create_at":&cadet.create_at,
        };

        self.mongo_service.collection("cadets").insert_one(user_doc,None).await?;
        Ok(())
    }

}