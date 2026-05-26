import hashlib
import json
from datetime import datetime, timezone
from typing import Any


class Block:
    def __init__(self, index: int, log_entry: dict[str, Any], previous_hash: str):
        self.index: int = index
        self.timestamp: str = datetime.now(timezone.utc).isoformat()
        self.log_entry: dict[str, Any] = log_entry
        self.previous_hash: str = previous_hash
        self.hash: str = self.calculate_hash()

    def calculate_hash(self) -> str:
        data: dict[str, Any] = {
            "index": self.index,
            "timestamp": self.timestamp,
            "log_entry": self.log_entry,
            "previous_hash": self.previous_hash,
        }
        return hashlib.sha256(json.dumps(data, sort_keys=True).encode()).hexdigest()

    def to_dict(self) -> dict[str, Any]:
        return {
            "index": self.index,
            "timestamp": self.timestamp,
            "log_entry": self.log_entry,
            "previous_hash": self.previous_hash,
            "hash": self.hash,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "Block":
        block = cls.__new__(cls)
        block.index = data["index"]
        block.timestamp = data["timestamp"]
        block.log_entry = data["log_entry"]
        block.previous_hash = data["previous_hash"]
        block.hash = data["hash"]
        return block
