class ResultsController < ApplicationController
  def create 
    @result = Result.new(params.require(:result).permit(:pid, :json))
    @result.save

    render json: {success: true}
  end
  
  def show
    @result = Result.order('id desc').find_by(pid: params[:id])

    render json: @result
  end
end
