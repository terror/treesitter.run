[.[].name]
| [range(0; length; 256) as $offset | .[$offset:$offset + 256] | tojson]
