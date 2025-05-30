Enum user_role {
  user
  admin
}

Enum gender_type {
  male
  female
  other
}

Table users {
  id int [pk, increment]
  fullname varchar(100)
  username varchar(50) [unique]
  email varchar(100) [unique, not null]
  phone_number varchar(20)
  date_of_birth date
  address varchar(255)
  avatar_url varchar(255)
  rule user_role
  gender gender_type
  country varchar(50)
  password varchar(255)
}

Table categories {
  id int [pk, increment]
  name varchar(50) [unique, not null]
}

Table user_favorite_categories {
  user_id int [ref: > users.id, pk]
  category_id int [ref: > categories.id, pk]
}

Table books {
  id int [pk, increment]
  title varchar(200)             
  author varchar(100)            
  category_id int [ref: > categories.id]  
  cover_url varchar(255)       
  description text              
  rating float [default: 0.0]    
  rating_count int [default: 0]  
}

Table comments {
  id int [pk, increment]
  user_id int [ref: > users.id]
  book_id int [ref: > books.id]
  rating int               
  text text                   
  like_count int [default: 0]
  created_at datetime [default: `now()`]
  updated_at datetime [default: `now()`]
  
  Indexes {
    (user_id, book_id) [unique]  
  }
}
