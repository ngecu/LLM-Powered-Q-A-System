from fastapi import APIRouter, HTTPException
from models.schemas import QueryRequest, QueryResponse
from services.llm_service import get_llm_response

router = APIRouter()

@router.post("/ask", response_model=QueryResponse)
async def ask_question(request: QueryRequest):
    try:
        answer = await get_llm_response(request.query)
        return QueryResponse(response=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
