import mongoose from 'mongoose';

const mongoUri = 'mongodb://localhost:27017/projectlens';

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const TaskSchema = new mongoose.Schema({
  name: String,
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'IN_PROGRESS'], default: 'PENDING' },
  projectId: mongoose.Schema.Types.ObjectId,
  completedAt: Date
});

const Project = mongoose.model('Project', ProjectSchema);
const Task = mongoose.model('Task', TaskSchema);

async function seed() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing
    await Project.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    const projects = [
      { 
        name: 'Skyline Residence Branding', 
        description: 'Comprehensive brand identity for the luxury residential complex in downtown. Includes visual system, signage, and digital presence.' 
      },
      { 
        name: "Editor's Lookbook", 
        description: 'Quarterly digital publication showcasing best-in-class UI patterns and editorial layouts.' 
      },
      { 
        name: 'Modernist Archive System', 
        description: 'Digitizing and categorizing structural patterns from 20th-century brutalist architecture.' 
      }
    ];

    for (const p of projects) {
      const project = await Project.create(p);
      console.log(`Created project: ${project.name}`);

      const tasks = Array.from({ length: 8 }).map((_, i) => ({
        name: `${['Research', 'Design', 'Development', 'Review', 'Testing', 'Handoff', 'Marketing', 'Launch'][i]} for ${project.name}`,
        status: i < 3 ? 'COMPLETED' : (i < 5 ? 'IN_PROGRESS' : 'PENDING'),
        projectId: project._id,
        completedAt: i < 3 ? new Date() : null
      }));

      await Task.insertMany(tasks);
      console.log(`Added 8 tasks to ${project.name}`);
    }

    console.log('\nSeeding complete! 🚀');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
