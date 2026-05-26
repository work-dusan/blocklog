import json
import os
from blockchain.block import Block
from typing import Any

STORAGE_PATH = os.path.join(os.path.dirname(__file__), "..", "storage", "chain.json")


class Blockchain:
    def __init__(self) -> None:
        self.chain: list[Block] = []
        self._load()
        if not self.chain:
            self._add_genesis()

    def _add_genesis(self) -> None:
        genesis = Block(
            index=0,
            log_entry={"event_type": "GENESIS", "message": "Blockchain initialized"},
            previous_hash="0" * 64,
        )
        self.chain.append(genesis)
        self._save()

    def add_log(
        self, event_type: str, user: str, ip: str = "N/A", details: str = ""
    ) -> Block:
        log_entry: dict[str, Any] = {
            "event_type": event_type,
            "user": user,
            "ip": ip,
            "details": details,
        }
        block = Block(
            index=len(self.chain),
            log_entry=log_entry,
            previous_hash=self.chain[-1].hash,
        )
        self.chain.append(block)
        self._save()
        return block

    def validate(self) -> list[dict[str, Any]]:
        errors: list[dict[str, Any]] = []
        for i in range(1, len(self.chain)):
            curr = self.chain[i]
            prev = self.chain[i - 1]

            recomputed = Block(curr.index, curr.log_entry, curr.previous_hash)
            recomputed.timestamp = curr.timestamp
            recomputed.hash = recomputed.calculate_hash()

            if curr.hash != recomputed.hash:
                errors.append(
                    {
                        "block_index": i,
                        "reason": "Block content has been modified – hash does not match",
                    }
                )

            if curr.previous_hash != prev.hash:
                errors.append(
                    {
                        "block_index": i,
                        "reason": "Chain is broken – previous_hash does not match",
                    }
                )

        return errors

    def tamper(self, index: int, new_details: str) -> bool:
        if 0 < index < len(self.chain):
            self.chain[index].log_entry["details"] = new_details
            self._save()
            return True
        return False

    def reset(self) -> None:
        self.chain = []
        if os.path.exists(STORAGE_PATH):
            os.remove(STORAGE_PATH)
        self._add_genesis()

    def chain_as_list(self) -> list[dict[str, Any]]:
        return [b.to_dict() for b in self.chain]

    def _save(self) -> None:
        os.makedirs(os.path.dirname(STORAGE_PATH), exist_ok=True)
        with open(STORAGE_PATH, "w") as f:
            json.dump([b.to_dict() for b in self.chain], f, indent=2)

    def _load(self) -> None:
        if os.path.exists(STORAGE_PATH):
            with open(STORAGE_PATH) as f:
                self.chain = [Block.from_dict(d) for d in json.load(f)]
