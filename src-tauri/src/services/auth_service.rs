use mongodb::{bson::{doc},error::Error};
use crate::models::user_model::User;
use crate::database::mongo_service::MongoService;
use crate::helper::{hash_text};

pub struct AuthService {
    mongo_service: MongoService,
}

impl AuthService {
    pub async fn new() -> Result<Self, Error> {
        let mongo_service = MongoService::new().await?;
        Ok(Self { mongo_service })
    }

    // pub async fn login(&self, user:User) -> Result<(), Error> {
    //     //compare input password and db password
    //     let user_doc = doc! {
    //         "identifier": &user.identifier,
    //     };
    //     let user_result = self.mongo_service.collection("users").find_one(user_doc,None).await?;

    //     match user_result {
    //         Some(user_doc) => {
    //             let db_password = user_doc.get_str("password").unwrap();
    //             let input_password = &user.password;
    //             let is_match = bcrypt::verify(input_password, db_password).unwrap();
    //             if is_match {
    //                 Ok(())
    //             } else {
    //                 Err(Error::AuthenticationError("Password is not match".to_string()))
    //             }
    //         }
    //         None => Err(Error::AuthenticationError("User not found".to_string())),
    //     }
    // }

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