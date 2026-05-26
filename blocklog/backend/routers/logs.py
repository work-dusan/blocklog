from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from blockchain.chain import Blockchain
from typing import Any

router = APIRouter(prefix="/api", tags=["logs"])
bc = Blockchain()


class LogRequest(BaseModel):
    event_type: str
    user: str
    ip: str = "N/A"
    details: str = ""


class TamperRequest(BaseModel):
    index: int
    new_details: str


@router.get("/chain")
def get_chain() -> list[dict[str, Any]]:
    return bc.chain_as_list()


@router.post("/logs")
def add_log(req: LogRequest) -> dict[str, Any]:
    block = bc.add_log(req.event_type, req.user, req.ip, req.details)
    return block.to_dict()


@router.get("/validate")
def validate() -> dict[str, Any]:
    errors = bc.validate()
    return {"valid": len(errors) == 0, "errors": errors}


@router.post("/tamper")
def tamper(req: TamperRequest) -> dict[str, str]:
    success = bc.tamper(req.index, req.new_details)
    if not success:
        raise HTTPException(status_code=400, detail="Invalid block index")
    return {"message": f"Block #{req.index} has been tampered"}


@router.delete("/chain")
def reset_chain() -> dict[str, str]:
    bc.reset()
    return {"message": "Blockchain has been reset"}
