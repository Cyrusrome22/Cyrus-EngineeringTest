import request from 'supertest';

describe('POST /api/tasks', () => {
  it('returns a 201 on when task is added', async () => {
    await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Task 1 Title',
        description: 'Task 1 Description',
      })
      .expect(201);
  });
  it('returns a 400 on when title is missing', async () => {
    await request(global.app)
      .post('/api/tasks')
      .send({
        description: 'Task 1 Description',
      })
      .expect(400);
  });
  it('returns a 400 on when description is missing', async () => {
    await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Tast 1 Title',
      })
      .expect(400);
  });
  it('returns a 400 on when both title and description is missing', async () => {
    await request(global.app).post('/api/tasks').send({}).expect(400);
  });
});

describe('GET /api/tasks', () => {
  it('returns status code 200', async () => {
    await request(global.app).get('/api/tasks').expect(200);
  });
});

describe('GET /api/tasks/:id', () => {
  it('returns status code 200 when task id is valid', async () => {
    const { body }: any = await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Task 1 Title',
        description: 'Task 1 Description',
      });

    await request(global.app)
      .get(`/api/tasks/${body.id}`)
      .expect(200);
  });

  it('returns status code 400 when task id is invalid', async () => {
    await request(global.app).get(`/api/tasks/12345`).expect(400);
  });
});

describe('PUT /api/tasks/:id', () => {
  it('returns status code 200 when task updates with a valid id', async () => {
    const { body }: any = await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Task 1 Title',
        description: 'Task 1 Description',
      });

    await request(global.app)
      .put(`/api/tasks/${body.id}`)
      .send({
        title: 'Buy Groceries Updated',
        description: 'To buy groceries at the store Updated',
        status: 'In Progress',
      })
      .expect(200);
  });

  it('returns status code 400 when task updates with a invalid id', async () => {
    const { body }: any = await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Task 1 Title',
        description: 'Task 1 Description',
      });

    await request(global.app)
      .put(`/api/tasks/12345`)
      .send({
        title: 'Buy Groceries Updated',
        description: 'To buy groceries at the store Updated',
        status: 'In Progress',
      })
      .expect(400);
  });

  it("returns status code 400 when status is not 'Completed' | 'In Progress' | 'Open'", async () => {
    const { body }: any = await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Task 1 Title',
        description: 'Task 1 Description',
      });

    await request(global.app)
      .put(`/api/tasks/${body.id}`)
      .send({
        title: 'Buy Groceries Updated',
        description: 'To buy groceries at the store Updated',
        status: 'Test',
      })
      .expect(400);
  });

  it('returns status code 400 when title is missing', async () => {
    const { body }: any = await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Task 1 Title',
        description: 'Task 1 Description',
      });

    await request(global.app)
      .put(`/api/tasks/${body.id}`)
      .send({
        description: 'To buy groceries at the store Updated',
        status: 'Test',
      })
      .expect(400);
  });

  it('returns status code 400 when description is missing', async () => {
    const { body }: any = await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Task 1 Title',
        description: 'Task 1 Description',
      });

    await request(global.app)
      .put(`/api/tasks/${body.id}`)
      .send({
        title: 'Task 1 Title',
        status: 'Test',
      })
      .expect(400);
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('returns status code 200 when task is being deleted with a valid id', async () => {
    const { body }: any = await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Task 1 Title',
        description: 'Task 1 Description',
      });

    await request(global.app)
      .delete(`/api/tasks/${body.id}`)
      .expect(200);
  });
  it('returns status code 400 when task is being deleted with an invalid id', async () => {
    const { body }: any = await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Task 1 Title',
        description: 'Task 1 Description',
      });

    await request(global.app).delete(`/api/tasks/12345`).expect(400);
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('returns status code 200 when task is being deleted with a valid id', async () => {
    const { body }: any = await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Task 1 Title',
        description: 'Task 1 Description',
      });

    await request(global.app)
      .delete(`/api/tasks/${body.id}`)
      .expect(200);
  });
  it('returns status code 400 when task is being deleted with an invalid id', async () => {
    const { body }: any = await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Task 1 Title',
        description: 'Task 1 Description',
      });

    await request(global.app).delete(`/api/tasks/12345`).expect(400);
  });
});

describe('POST /api/tasks/reorder', () => {
  it('returns status code 200 when task is being reordered with a valid id', async () => {
    await request(global.app).post('/api/tasks').send({
      title: 'Task 1 Title',
      description: 'Task 1 Description',
    });

    await request(global.app).post('/api/tasks').send({
      title: 'Task 2 Title',
      description: 'Task 2 Description',
    });

    const task: any = await request(global.app)
      .post('/api/tasks')
      .send({
        title: 'Task 3 Title',
        description: 'Task 3 Description',
      });

    await request(global.app)
      .post(`/api/tasks/reorder`)
      .send({
        id: task.body.id,
        position: 0,
      })
      .expect(200);
  });
  it('returns status code 400 when task is being reordered with an invalid id', async () => {
    await request(global.app).post('/api/tasks').send({
      title: 'Task 1 Title',
      description: 'Task 1 Description',
    });

    await request(global.app).post('/api/tasks').send({
      title: 'Task 2 Title',
      description: 'Task 2 Description',
    });

    await request(global.app).post('/api/tasks').send({
      title: 'Task 3 Title',
      description: 'Task 3 Description',
    });

    await request(global.app).delete(`/api/tasks/12345`).expect(400);
  });
});
