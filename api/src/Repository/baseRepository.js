class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async createOne(payload) {
    return await this.model.create(payload);
  }

  async createMany(payload) {
    return await this.model.insertMany(payload);
  }

  async findOne(query) {
    return await this.model.findOne(query).lean();
  }

  async findMany(
    query,
    // options are: sort, skip, limit, populate
    options
  ) {
    let mongoQuery = this.model.find(query);

    // Apply sorting if provided
    if (options.sort) {
      mongoQuery = mongoQuery.sort(options.sort);
    }

    // Apply pagination if skip and limit are provided
    if (typeof options.skip === "number") {
      mongoQuery = mongoQuery.skip(options.skip);
    }

    if (typeof options.limit === "number") {
      mongoQuery = mongoQuery.limit(options.limit);
    }

    // Apply population if provided
    if (Array.isArray(options.populate)) {
      options.populate.forEach((field) => {
        mongoQuery = mongoQuery.populate(field);
      });
    }

    return mongoQuery; // Return the query object for further manipulation or execution
  }

  async updateOne(
    filter,
    setPayload,
    unsetPayload
  ) {
    // Prepare update operations
    const updateOperations = {
      $set: setPayload,
    };

    // Include $unset only if unsetPayload is provided
    if (unsetPayload) {
      updateOperations.$unset = unsetPayload;
    }

    // Perform the update
    const updatedDocument = await this.model.findOneAndUpdate(
      filter,
      updateOperations,
      { new: true, runValidators: true }
    );

    return updatedDocument;
  }

  async updateMany(
    filter,
    setPayload,
    unsetPayload
  ) {
    const updateQuery = {
      $set: setPayload,
      $unset: unsetPayload,
    };
    return await this.model.updateMany(filter, updateQuery);
  }

  async deleteOne(query) {
    return await this.model.deleteOne(query);
  }

  async deleteMany(query) {
    return await this.model.deleteMany(query);
  }

  async aggregate(pipeline) {
    return await this.model.aggregate(pipeline).exec();
  }

  async populate(
    documentsToBePopulated,
    paths,
    models
  ) {
    const populateOptions = paths.map((path, index) => ({
      path,
      model: models[index],
    }));
    return (await this.model.populate(
      documentsToBePopulated,
      populateOptions
    ));
  }
}

export {BaseRepository}