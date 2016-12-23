class ReviewsController < ApplicationController
  def index
    @reviews = Review.all
    respond_to do |format|
      format.json { render json: @reviews.to_json }
    end
  end

  def create
    @review = Review.new(review_params)

    respond_to do |format|
      if @review.save
        format.json { render json: @review }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def update
    @review = Review.find(params[:id])

    respond_to do |format|
      if @review.update(review_params)
        format.json { render json: @review }
      else
        format.json { render status: :unprocessable_entity }
      end
    end
  end

  def review_params
    params.require(:review).permit(:truck_name, :body, :rating, :user_id)
  end
end
