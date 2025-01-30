MongoDB: Logical Query ($or,$nor,$nin,$ne)
 Schema.pre("save", function())
Compound Index: https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
ref and populate

pagination using mongoDB skip() & limit():
/feed?page=1&limit=10 => 1 - 10 users => .skip(0) & .limit(10)

/feed?page=2&limit=10 => 11 - 20 users => .skip(10) & .limit(10)

/feed?page=3&limit=10 => 21 - 30 users => .skip(20) & .limit(10)


.skip() & limit() 


skip= (page-1) * limit ;




