use mongodb::{bson::{doc,Document},error::Error,options::FindOneOptions};
use crate::models::user_model::User;
use crate::database::mongo_service::MongoService;
use crate::helper::{hash_text};
use bcrypt;
use bcrypt::verify;

pub struct AuthService {
    mongo_service: MongoService,
}

impl AuthService {
    pub async fn new() -> Result<Self, Error> {
        let mongo_service = MongoService::new().await?;
        Ok(Self { mongo_service })
    }


    pub async fn login(&self, identifier:String, password:String) -> Result<Document, String> {
        //compare input password and db password
        let filter:Document = doc! {
             "identifier": identifier,
         };
        let options:FindOneOptions = FindOneOptions::builder().projection(doc! {"_id": 0}).build();
        let user: Option<Document> = self.mongo_service.collection("users").find_one(filter,options).await.map_err(|e| e.to_string())?;

        if let Some(user_doc) = user {
            let stored_password = user_doc.get_str("password").unwrap_or_default();
            let verify_result =verify(password, stored_password).map_err(|e| e.to_string())?;

            if verify_result {
                Ok(user_doc)
            } else {
                Err("Contraseña incorrecta".to_string())
            }

        } else {
            Err("Usuario no encontrado".to_string())
        }
    }

    pub async fn signup(&self, user:User) -> Result<(), Error> {
        match hash_text(&user.password, 4) {
            Ok(hash_password) => {
                let user_doc = doc! {
                    "identifier": &user.identifier,
                    "password": hash_password,
                    "role": &user.role,
                    "create_at": &user.create_at,
                 };

                self.mongo_service.collection("users").insert_one(user_doc,None).await?;
               Ok(())
            }
            Err(_) => Ok(()),
        }

    }

}