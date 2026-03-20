import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('Database Connectivity and Aggregation (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    connection = moduleFixture.get(getConnectionToken());
  });

  afterAll(async () => {
    // Clean up after tests
    await connection.dropDatabase();
    await app.close();
  });

  it('should verify database connection', () => {
    expect(connection.readyState).toBe(1); // 1 means connected
  });

  it('should create a project, add tasks, and get correct metrics', async () => {
    // 1. Create Project
    const projectResponse = await request(app.getHttpServer())
      .post('/projects')
      .send({ name: 'E2E Project', description: 'Testing metrics' })
      .expect(201);

    const projectId = projectResponse.body._id;

    // 2. Create 2 tasks (one completed, one pending)
    const task1Response = await request(app.getHttpServer())
      .post('/tasks')
      .send({ name: 'Task 1', projectId })
      .expect(201);

    await request(app.getHttpServer())
      .post('/tasks')
      .send({ name: 'Task 2', projectId })
      .expect(201);

    // 3. Complete Task 1
    await request(app.getHttpServer())
      .patch(`/tasks/${task1Response.body._id}/complete`)
      .expect(200);

    // 4. Verify Metrics
    const metricsResponse = await request(app.getHttpServer())
      .get(`/projects/${projectId}/metrics`)
      .expect(200);

    expect(metricsResponse.body.progress).toBe(50);
    expect(metricsResponse.body.totalTasks).toBe(2);
    expect(metricsResponse.body.completedTasks).toBe(1);
    expect(metricsResponse.body.averageCompletionTimeMinutes).toBeGreaterThanOrEqual(0);
  });
});
