const { reputationManagementModel } = require('../models');
const utils = require('../utils');

class ReviewService {
  constructor() {
    this.model = reputationManagementModel;
  }

  async getReviewsByVendor(propertyId, vendor, query) {
    try {
      const [data] = await this.model
        .aggregate([
          { $match: { property_id: propertyId, vendor } },
          {
            $group: {
              _id: null,
              reviews: { $push: { review_id: '$_id', review: '$review', vendor: '$vendor' } },
            },
          },
        ])
        .exec();

      const { reviews = [] } = data || {};

      const options = {
        limit: query.limit || 10,
        page: query.page || 1,
        sortBy: query.sortBy || 'date',
        sortOrder: query.sortOrder === 'desc' ? -1 : 1,
      };

      const result = utils.paginate(reviews, options);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getReviewDetail(reviewId) {
    try {
      const [data] = await this.model
        .aggregate([
          {
            $match: { $expr: { $eq: ['$_id', { $toObjectId: reviewId }] } },
          },

          {
            $unwind: {
              path: '$asqe',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: 'sentimentCategories',
              localField: 'asqe.category_id',
              foreignField: '_id',
              as: 'asqe.category',
            },
          },
          {
            $unwind: {
              path: '$asqe.category',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $group: {
              _id: '$_id',
              review: { $first: '$review' },
              asqe: {
                $push: {
                  aspect: '$asqe.aspect',
                  opinion: '$asqe.opinion',
                  sentiment: '$asqe.sentiment',
                  category: '$asqe.category.name',
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              review_id: '$_id',
              review: 1,
              asqe: 1,
            },
          },
        ])
        .exec();

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ReviewService;
