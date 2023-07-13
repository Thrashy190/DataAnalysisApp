use bcrypt::hash;


pub fn hash_text(text: &String, cost: u32) -> Result<String, String> {
    return match hash(text, cost) {
        Ok(hash_text) => Ok(hash_text),
        Err(_) => Err("Error".to_string()),
    };
}
