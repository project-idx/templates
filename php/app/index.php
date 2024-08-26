<?php

$name = getenv('NAME', true) ?: 'World';
echo sprintf('Hello %s!', $name);