class ResultsController < ApplicationController
  def index
    @pids = (1..16).to_a + (101..116).to_a

    @results = @pids.map { |pid| [pid, Result.order('id desc').find_by(pid: pid)] }
  end

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
