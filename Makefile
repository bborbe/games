.PHONY: test test-offline serve

test:
	node scripts/check.mjs

test-offline:
	node scripts/check.mjs --no-links

serve:
	python3 -m http.server 8080
