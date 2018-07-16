
import mongoose, {Model, Schema} from 'mongoose';

const schema = new Schema({
  name: String,
  email: String,
  password: String
});

class User extends Model {}

export default mongoose.model(User, schema, 'User');