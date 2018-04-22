<?php

namespace App\Console\Commands;

use GuzzleHttp\Client;
use Illuminate\Console\Command;

class InitElasticsearch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gblog:inites';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Init elastic search index';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $client = new Client();

        $this->createTemplate($client);

        $this->createIndex($client);
        $this->info('Creatd elasticsearch template and index successfull!');
    }

    /**
     * Create es template
     *
     * @param  Client $client
     *
     * @return void
     */
    protected function createTemplate(Client $client)
    {
        $url = config('scout.elasticsearch.hosts')[0] . ':9200/' . '_template/rtf';
        $client->put($url, [
            'json' => [
                'template' => '*',
                'settings' => [
                    'number_of_shards' => 1
                ],
                'mappings' => [
                    '_default_' => [
                        '_all' => [
                            'enabled' => false
                        ],
                        'dynamic_templates' => [
                            [
                                'strings' => [
                                    'match_mapping_type' => 'string',
                                    'mapping' => [
                                        'type' => 'text',
                                        'analyzer' => 'ik_smart',
                                        'ignore_above' => 256,
                                        'fields' => [
                                            'keyword' => [
                                                'type' => 'keyword'
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]);

    }

    /**
     * Create es index
     *
     * @param  Client $client
     *
     * @return void
     */
    protected function createIndex(Client $client)
    {
        $url = config('scout.elasticsearch.hosts')[0] . ':9200/' . config('scout.elasticsearch.index');
        $client->put($url, [
            'json' => [
                'settings' => [
                    'refresh_interval' => '5s',
                    'number_of_shards' => 1,
                    'number_of_replicas' => 0,
                ],
                'mappings' => [
                    '_default_' => [
                        '_all' => [
                            'enabled' => false
                        ]
                    ]
                ]
            ]
        ]);
    }
}
