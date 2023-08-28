use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthLogin {
    pub identifier: String,
    pub password: String,
    pub accept_terms_and_conditions: bool,
}
