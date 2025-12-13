import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed }, // Flexible for any content structure
  sections: { type: Array, default: [] }
});

const Page = mongoose.model('Page', PageSchema);
export default Page;
